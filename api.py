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
        """
        Check if card details provided are valid.
        """
        req_data = request.json
        card_str = req_data['cardnum'].replace(" ", "")

        # 1 check card exp date -- after PRESENT time
        if ('-' in req_data['expdate']):
            year, mth = req_data['expdate'].split('-')

            # this will check if user put in reverse date format
            if (len(year) != 4):
                raise (wz.NotAcceptable("Wrong date format-inverted"))

            if (datetime.now().year > int(year)):
                raise (wz.NotAcceptable("Card has expired"))
            elif (datetime.now().year == int(year) and datetime.now().month >= int(mth)):
                raise (wz.NotAcceptable("Card has expired"))
            else:
                print("Exp date valid")
                # check next requirement
        else:
            raise (wz.NotAcceptable("Wrong date format"))
        
        # 2 check CVV digit length
        # check if American express card
        cvv_str = req_data['cvv']
        startNum = card_str[0:2]
        if (startNum == '34' or startNum == '37'):
            # American express, must be 4 digits long
            if (len(cvv_str) != 4):
                raise (wz.NotAcceptable("Invalid CVV"))
            else:
                print("Valid CVV")
                # check next requirement
        else:
            # NOT American express, must be 3 digits long
            if (len(cvv_str) != 3):
                raise (wz.NotAcceptable("Invalid CVV"))
            else:
                print("Valid CVV")
                # check next requirement

        # 3 check PAN btwn 16 -19 digits
        if (len(card_str) < 16 or len(card_str) > 19):
            raise (wz.NotAcceptable("Invalid card number"))
        else:
            print(len(card_str))
            print("Card number valid")
        
        # if 1, 2, 3 pass -> return success
        # either one not pass -> not acceptable
        return "success."

if __name__ == '__main__':
    app.run(debug=True)

