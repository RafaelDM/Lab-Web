# API
# IBM Watson
import os
import json
import logging
import requests

from jsonschema import validate, ValidationError
from ibm_watson import AssistantV2, ApiException
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from flask import jsonify

import flask
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
from dotenv import load_dotenv
from flask_api import status

from IBM_Whatson import watson_create_session, watson_response, watson_instance

load_dotenv()

app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

assistant_url = os.getenv("assistant_url")
assistant_version = os.getenv("assistant_version")
assistant_id = os.getenv("assistant_id")

def watson_create_session():
    assistant_api_key = os.getenv("assistant_api_key")
    return assistant_api_key


class GET_MESSAGE(Resource):
    def post(self):
        # Hay que añadir las funciones de watson que ya tenemos para que nos pueda regresar el intent y el mensaje
        response = watson_response(watson_create_session(), request.json['message'])
        print(response)
        watson_output = response["generic"][0]["text"]        
        if len(response['intents']) != 0:
            intent = response["intents"][0]["intent"]
            user_input = request.json['message']
            print("User input: ", user_input)
            print('Intent: ', intent)
            print("Watson output: ", watson_output)
            return jsonify(intent = intent, user_input = user_input, watson_output = watson_output)
        else:
            return jsonify(watson_output = watson_output)


api.add_resource(GET_MESSAGE, '/getmessage')  # Route_1

if __name__ == '__main__':
    app.run(port='5002')
