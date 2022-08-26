from http import HTTPStatus
from flask import Flask, request, Response
from flask_restx import Resource, Api, fields
import werkzeug.exceptions as wz

app = Flask(__name__)
api = Api(app)

card_fields = api.model('Card', {
    'cardnum': fields.String
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
        req_data = request.json
        card_str = req_data['cardnum'].replace(" ", "")
        if (13 <= len(card_str) <= 19):
            return "success."
        else:
            raise (wz.NotAcceptable("Invalid card number"))

if __name__ == '__main__':
    app.run(debug=True)

