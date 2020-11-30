from twilio.rest import Client 
from twilio.twiml.messaging_response import Body, Message, Redirect, MessagingResponse
# API
import os
import json
import logging
import requests
import re

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

# Firebase libraries
import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage
from firebase_admin import firestore
# Import UUID4 to create token
from uuid import uuid4

image_url = 'https://s3-external-1.amazonaws.com/media.twiliocdn.com/AC3e78880c8d4ae0f9f463b33acd709f08/5af2b92dd73f84f20db063456dd29751' #we pass the url as an argument

cred = credentials.Certificate('./petifind-fb.json')
firebase_admin.initialize_app(cred, {
    'storageBucket': 'petifind-b607c.appspot.com'
})
bucket = storage.bucket()

## Connect to mongo
uri = "mongodb+srv://user_web:hola123@avotar.umbnv.mongodb.net/perrosperdidos?retryWrites=true&w=majority"

firebase_db = firestore.client()

## Whatsapp/Twilio id, token
account_sid = 'AC3e78880c8d4ae0f9f463b33acd709f08' 
auth_token = 'a84b73ec9d3477c622a1099090b31795' 
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

def get_all_intents():
    client = pymongo.MongoClient(uri)
    db = client.get_default_database()
    analytics = db['analytics']
    cursor = analytics.find({}).sort("requests", -1)   
    allIntents = []

    for document in cursor:
        intent_object = {"intent": document['intent'], "entity": document['entity'], "entity_value": document['entity_value'], "source": document['source'], "requests": document['requests']}
        allIntents.append(intent_object)

    client.close()
    return allIntents

def get_top_five_intents():
    all_intents = get_all_intents();
  
    intentsLabels = []
    intentsRequests = [];
    x = range(5)

    for i in x:
        intentsLabels.append(all_intents[i]['intent'])
        intentsRequests.append(all_intents[i]['requests'])

    topFiveIntents = {"labels": intentsLabels, "requests": intentsRequests}
    return topFiveIntents

def get_unrecognized_messages():
    client = pymongo.MongoClient(uri)
    db = client.get_default_database()
    unrecognized_messages_c = db['unrecognized_messages']
    cursor = unrecognized_messages_c.find({}).sort("repetitions", -1) 
    unrecognized_messages = []

    for document in cursor:
        um_object = {"message": document['message'], "source": document['source'], "repetitions": document['repetitions']}
        unrecognized_messages.append(um_object)

    client.close()
    return unrecognized_messages

s = 'username:"Username"caption:"el comentario que quieras"'
username = re.search('username:"(.*?)"', s)
caption = re.search('caption:"(.*?)"', s)
print(username.group(1))
print(caption.group(1))

def create_post():
    # Create new token
    new_token = uuid4()
    # Create new dictionary with the metadata
    metadata  = {"firebaseStorageDownloadTokens": new_token}
    image_data = requests.get(image_url).content
    blob = bucket.blob('images/prueba10.jpg')
    # Set metadata to blob
    blob.metadata = metadata
    blob.upload_from_string(
            image_data,
            content_type='image/jpg'
        )
    blob.make_public()
    # doc_ref = firebase_db.collection(u'Posts').document(u'alovelace')
    doc_ref = firebase_db.collection(u'Posts').document()
    doc_ref.set({
        u'first': u'Ada',
        u'last': u'Lovelace',
        u'born': 1815
    })
    print(blob.public_url)


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
            message_response = client.messages.create( 
                              from_=number_from,  
                              MediaUrl = whatsapp_message["imagenes"][idx],      
                              to=number_to
                          ) 
    

class GET_MESSAGE_WHATSAPP(Resource):
    def post(self):
        print(request.values)
        body = request.values.get("Body")
        numMedia = request.values.get("NumMedia")
        if body is '' and numMedia == '1':
            print("Dios de los perros")
            print('\n')
        elif body != '' and numMedia == '1': 
            print('2')
            create_post()
            print('\n')
        else: 
            message = request.values.get("Body")
            whatsapp_response(message)
            print('\n')

class GET_TOP_FIVE_INTENTS(Resource):
    def get(self):
        topFiveIntents = get_top_five_intents();
        requests_number = topFiveIntents['requests']
        labels = topFiveIntents['labels']
        return jsonify(data = requests_number, labels = labels)

class GET_UNRECOGNIZED_MESSAGES(Resource):
    def get(self):
        unrecognized_messages = get_unrecognized_messages()
        return jsonify(unrecognized_messages)

class GET_ALL_INTENTS(Resource):
    def get(self):
        intents = get_all_intents()
        return jsonify(intents)

api.add_resource(GET_MESSAGE_CHATBOT, '/getMessage')  # Route_1 Chatbot
api.add_resource(GET_MESSAGE_WHATSAPP, '/getMessageWhatsapp')  # Route_2 Whatsapp 
api.add_resource(GET_TOP_FIVE_INTENTS, '/getAnalytics') # route 3
api.add_resource(GET_ALL_INTENTS, '/getAllintents') # route 4
api.add_resource(GET_UNRECOGNIZED_MESSAGES, '/getUnrecognizedMessages') # route 5

if __name__ == '__main__':
    app.run(port='5002')