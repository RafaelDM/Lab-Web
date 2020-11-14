from twilio.rest import Client 
from twilio.twiml.messaging_response import Body, Message, Redirect, MessagingResponse
# API
import os
import json
import logging
import requests

import flask
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
from dotenv import load_dotenv
from flask_api import status

from jsonschema import validate, ValidationError
from ibm_watson import AssistantV2, ApiException
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from flask import jsonify

# Mongo libraries
import sys
import pymongo

## Connect to mongo
uri = "mongodb+srv://user_web:hola123@avotar.umbnv.mongodb.net/perrosperdidos?retryWrites=true&w=majority"

## Whatsapp/Twilio id, token
account_sid = 'AC3e78880c8d4ae0f9f463b33acd709f08' 
auth_token = 'a7cf544c81244eac44bb20bce6919a3f' 
client = Client(account_sid, auth_token) 

number_to = 'whatsapp:+5218332326309' 
number_from = 'whatsapp:+14155238886'

load_dotenv()

app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

assistant_api_key = os.getenv("assistant_api_key")


def watson_create_session():

    iam_apikey = os.getenv("assistant_api_key")
    assistant_url = os.getenv("assistant_url")
    assistant_version = os.getenv("assistant_version")

    assistant = watson_instance(iam_apikey, assistant_url, assistant_version)

    try:
        watson_session = assistant.create_session(
            assistant_id=os.getenv("assistant_id")
        ).get_result()
        watson_session_id = watson_session["session_id"]
    except KeyError:
        _logger.error("The session wasn't created")
        return jsonify({"error": "Error creating the session"}), status.HTTP_503_SERVICE_UNAVAILABLE

    return watson_session_id

def watson_response(session_id1, message, source):
    
    iam_apikey = os.getenv("assistant_api_key")
    assistant_url = os.getenv("assistant_url")
    assistant_version = os.getenv("assistant_version")

    assistant = watson_instance(iam_apikey, assistant_url, assistant_version)
    context = {}
    watson_session_id = session_id1

    try:
        watson_response = assistant.message(
            assistant_id=os.getenv("assistant_id"),
            session_id=watson_session_id,
            input={
                'message_type': 'text',
                'text': message,
                'options': {
                    'return_context': True
                }
            },
            context=context
        ).get_result()
    except ValueError as ex:
        _logger.error("Value error: %s", ex)
        return jsonify({'error': "Value error"}), status.HTTP_500_INTERNAL_SERVER_ERROR
    except ApiException:
        try:
            watson_session = assistant.create_session(
                assistant_id=os.getenv("assistant_id")
            ).get_result()
            watson_session_id = watson_session["session_id"]

            watson_response = assistant.message(
                assistant_id=os.getenv("assistant_id"),
                session_id=watson_session_id,
                input={
                    'message_type': 'text',
                    'text': message,
                    'options': {
                        'return_context': True
                    }
                },
                context=context
            ).get_result()
        except KeyError:
            _logger.error("The session wasn't created")
            return jsonify({"error": "Error creating the session"}), status.HTTP_503_SERVICE_UNAVAILABLE

    try:
        del watson_response["context"]["global"]["session_id"]
    except:
        pass

    response = {
        "response": watson_response,
        "session_id": watson_session_id
    }

    print('Response \n')
    print(response)
    print('\n')

    intent = ''
    entity = ''
    entity_value = ''

    if len(response['response']['output']['intents']) > 0 and len(response['response']['output']['entities']) > 0:
        intent = response['response']['output']['intents'][0]["intent"]
        entity = response['response']['output']['entities'][0]["entity"]
        entity_value = response['response']['output']['entities'][0]["value"]
    elif len(response['response']['output']['intents']) == 0 and len(response['response']['output']['entities']) > 0:
        intent = 'No_intent'
        entity = response['response']['output']['entities'][0]["entity"]
        entity_value = response['response']['output']['entities'][0]["value"]
    elif len(response['response']['output']['intents']) > 0 and len(response['response']['output']['entities']) == 0:
        intent = response['response']['output']['intents'][0]["intent"]
        entity = 'No_entity'
        entity_value = 'No_entityValue'
    elif len(response['response']['output']['intents']) == 0 and len(response['response']['output']['entities']) == 0:
        intent = "anything_else"
        entity = 'No_entity'
        entity_value = 'No_entityValue'
    else:
        intent = 'No_intent'

    response_message = obtain_message(intent, entity, entity_value, source)

    addAnalytics(intent, entity, entity_value, source, message)

    message_document = {
        "intent": intent,
        "entity": entity,
        "entity_value": entity_value,
        "response_message": response_message,
        "received_message": message,
        "source": source
    }

    save_response(message_document, intent)

    if source == 'chatbot':
        return response_message
    elif source == 'whatsapp':
        return json.loads(response_message)

def watson_instance(iam_apikey: str, url: str, version: str = "2019-02-28") -> AssistantV2:
    try:
        authenticator = IAMAuthenticator(iam_apikey)
        assistant = AssistantV2(
            authenticator=authenticator,
            version=version
        )
        assistant.set_service_url(url)
    except ApiException as error:
        _logger.error("%s - %s", error.code, error.message)
        return jsonify({'error': str(error.message)}), error.code

    return assistant

def save_response(response_document, intent):
    client = pymongo.MongoClient(uri)
    db = client.get_default_database()
    messages = db['messages']
    messages.insert_one(response_document)
    client.close()

def obtain_message(intent, entity, entity_value, source):
    client = pymongo.MongoClient(uri)
    db = client.get_default_database()
    responses = db['responses']
    intent_document = responses.find_one({"intent": intent, "entity": entity, "entity_value": entity_value})

    if source == 'chatbot':
        response_message = intent_document['html']
    elif source == 'whatsapp':
        response_message = intent_document['whatsapp']
    client.close()
    return response_message

def addAnalytics(intent, entity, entity_value, source, message):
    client = pymongo.MongoClient(uri)
    db = client.get_default_database()
    analytics = db['analytics']
    unrecognized_messages = db['unrecognized_messages']

    if intent == "anything_else": 
        if unrecognized_messages.count_documents({ "message": message, "source": source }, limit = 1) != 0:
            unrecognized_messages.update_one({"message": message, "source": source}, {'$inc': {"repetitions": 1}})
        else:
            new_unrecognized_message = {"message": message, "source": source, "repetitions": 1}
            unrecognized_messages.insert_one(new_unrecognized_message)

    if analytics.count_documents({ "intent": intent, "entity": entity, "entity_value": entity_value, "source": source }, limit = 1) != 0:
        analytics.update_one({"intent": intent, "entity": entity, "entity_value": entity_value, "source": source}, {'$inc': {"requests": 1}})
    else:
        new_intent = {"intent": intent, "entity": entity, "entity_value": entity_value, "source": source, "requests": 1}
        analytics.insert_one(new_intent)

    client.close()

class GET_MESSAGE_CHATBOT(Resource):
    def post(self):
        message = request.json["message"]

        resp_html = watson_response(watson_create_session(), request.json["message"], 'chatbot')

        return jsonify(
            text=resp_html,
        )

def whatsapp_response(message):

    whatsapp_message = watson_response(watson_create_session(), message, 'whatsapp')

    if len(whatsapp_message["mensaje"]) > 0: 
        for idx, val in enumerate(whatsapp_message["mensaje"]):
            if len(whatsapp_message["imagenes"]) > 0:
                print(idx)
                print(whatsapp_message["imagenes"][idx])
                message_response2 = client.messages.create( 
                                from_=number_from, 
                                body=whatsapp_message["mensaje"][idx],  
                                media_url = whatsapp_message["imagenes"][idx],      
                                to=number_to
                            ) 
            elif len(whatsapp_message["imagenes"]) == 0:
                message_response = client.messages.create( 
                                from_=number_from,  
                                body=whatsapp_message["mensaje"][idx],      
                                to=number_to
                            ) 
    elif len(whatsapp_message["imagenes"]) > 0:
        for idx, val in enumerate(whatsapp_message["imagenes"]):
            print(idx)
            print(val)
            message_response = client.messages.create( 
                              from_=number_from,  
                              MediaUrl = whatsapp_message["imagenes"][idx],      
                              to=number_to
                          ) 
    

class GET_MESSAGE_WHATSAPP(Resource):
    def post(self):
        message = request.values.get("Body")
        whatsapp_response(message)



class GET_DATA(Resource):
    def get(self):
        data_analytics= [20,30,40,50,60]
        labels = ["Adoption", 
        "Adoptar Especifico",
        "Information",
        "Ubicaciones",
        "Anything Else",
        ]
        return jsonify(data = data_analytics, labels = labels)

api.add_resource(GET_MESSAGE_CHATBOT, '/getMessage')  # Route_1 Chatbot
api.add_resource(GET_MESSAGE_WHATSAPP, '/getMessageWhatsapp')  # Route_2 Whatsapp 
api.add_resource(GET_DATA, '/getAnalytics') # route 3

if __name__ == '__main__':
    app.run(port='5002')