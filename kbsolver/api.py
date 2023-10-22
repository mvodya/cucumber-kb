from flask import Flask, make_response, json

api = Flask(__name__)

@api.route('/')
def root():
  resp = make_response()
  resp.status_code = 403
  return resp

@api.route('/ping')
def ping():
  return json.dumps({"status": "pong"})