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

load_dotenv()

app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
 
account_sid = 'AC3e78880c8d4ae0f9f463b33acd709f08' 
auth_token = '87f54804e2d81efd66b0a8c24cfb39b1' 
client = Client(account_sid, auth_token) 

def whatsapp_response(message):
    print(message)

     
    message2 = client.messages.create( 
                              from_='whatsapp:+14155238886',  
                              body=message,      
                              to='whatsapp:+5218332326309' 
                          ) 
    # client = pymongo.MongoClient(uri)
    # db = client.get_default_database()
    # responses = db['responses']
    # intent_document = responses.find_one({"intent": intent})
    # response_html = intent_document['html']
    # client.close()
    # return response_html

class GET_MESSAGE_WHATSAPP(Resource):
    def post(self):

        message = request.values.get("Body")

        whatsapp_response(message)

        # print("hola")

        # resp_html = watson_response(watson_create_session(), request.json["message"] )

        # return jsonify(
        #     text=resp_html,
        #     # intent=resp['response']['output']['intents'][0]["intent"],
        # )


api.add_resource(GET_MESSAGE_WHATSAPP, '/getMessageWhatsapp')  # Route_1

if __name__ == '__main__':
    app.run(port='5002')
 