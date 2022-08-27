# Solution for LevelUp take-home assignment

* Backend API server is made using flask-restx 
* Frontend is made using ReactJS

## Overview
After inputting card details in the form, data is send to backend using POST API call. POST ensure card details are send through body of API call. API server get the data, and perform validation algorithm which as follows:
* Check card expiry date
* Check CVV digit length
* Check PAN digit length <br/>

If validation algorithm fail at any step, it will stop continuing with the validation algorithm and raise exceptions. If validation algorithm reach the end, api will send success response.
Frontend server will use the success or failed response, and render a message at the bottom indicating if card is valid or not.

## Installation
1. Clone the repo
```
git clone https://github.com/aliahshakirin/aliah-evaluation.git
```
2. Run backend server
```
python api.py
```
3. CD into frontend repo
```
cd ecommerce-frontend
```
4. Install dependencies
```
npm install
```
5. Run the app
```
npm run
```
