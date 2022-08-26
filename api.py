from http import HTTPStatus
from flask import Flask, request
from flask_restx import Resource, Api, fields
from datetime import datetime
import werkzeug.exceptions as wz

app = Flask(__name__)
api = Api(app)

# for Swagger interface
card_fields = api.model('Card', {
    'cardnum': fields.String,
    'expdate': fields.String(default='MM-YYYY'),
    'cvv': fields.String
})

# present time in the format mm/yyyy
# today = datetime.today().strftime("%m/%Y")

@api.route('/hello')
class HelloWorld(Resource):
    def get(self):
        """
        A trivial endpoint to see if the server is running.
        Returns hello world
        """
        return {'hello': 'world'}

@api.route('/card/validate')
class ValidateCard(Resource):
    @api.expect(card_fields)
    def post(self):
        req_data = request.json
        card_str = req_data['cardnum'].replace(" ", "")

        # check card exp date
        year, mth = req_data['expdate'].split('-')
        if (datetime.now().year > int(year)):
            print("expired")
        elif (datetime.now().year == int(year) and datetime.now().month >= int(mth)):
            print("expired")
        else:
            print("not expired")
        
        # check if American express card
        cvv_str = req_data['cvv']
        startNum = card_str[0:2]
        if (startNum == '34' or startNum == '37'):
            # American express, must be 4 digits long
            if (len(cvv_str) == 4):
                print("valid cvv")
            else:
                print("invalid cvv")
        else:
            # NOT American express, must be 3 digits long
            if (len(cvv_str) == 3):
                print("valid cvv")
            else:
                print("invalid cvv")

        # check PAN
        if (13 <= len(card_str) <= 19):
            return "success."
        else:
            raise (wz.NotAcceptable("Invalid card number"))

if __name__ == '__main__':
    app.run(debug=True)

