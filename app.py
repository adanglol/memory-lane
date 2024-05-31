from flask import Flask
from dotenv import dotenv_values

app = Flask(__name__)
config = dotenv_values(".env") 

@app.route('/')
def hello_world():
    # print(dotenv_values(".env"))
    print(config)
    return "<p>Hellzo, World sss!</p >"