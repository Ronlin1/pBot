from flask import Flask, render_template, request, jsonify
import pprint
import pangea
import google.generativeai as palm

palm.configure(api_key='AIzaSyDslGELzeDfdc3DLufleR1y2Reie8RSGfk')
model = palm.get_model('models/chat-bison-001') 

app = Flask(__name__, template_folder='templates', static_folder='static')

@app.route("/")
def index():
    return render_template('chat.html')

@app.route("/get", methods=["POST"])
def chat():
    if request.method == "POST":
        msg = request.form["msg"]
        response = get_Chat_response(msg)
        return response

def get_Chat_response(prompt):
    response = palm.chat(
        context=pangea.Pangea,
        model=model,
        messages=[prompt]
    )
    # Extract Response Here
    bot_response = response.messages[-1]['content']

    # You can also print the entire response for debugging purposes
    # print(response)

    return bot_response

if __name__ == '__main__':
    app.run()