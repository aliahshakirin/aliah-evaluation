import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import './App.css';
import axios from 'axios';

function App() {
  const [cardnum, setCardnum] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/card/validate", {
      cardnum
    }).then((response) => {
      console.log(response.data)
    }).catch(error => {
      console.log(error);
    })
  }
  
  
  return (
    <div className="App">
      <div className="header">
        <h1>My ecommerce website</h1>
        <h2>Enter your payment details</h2>
      </div>
    
      <div className="info">
        <form onSubmit={handleSubmit}>
          <label for="cardnum">Card number</label>
          <input 
            type="text" 
            id="cardnum" 
            placeholder="1234 5678 9876 5432"
            onChange={(e) => setCardnum(e.target.value)}
          /><br/>
          <label for="cvv">CVV</label>
          <input type="text" id="cvv" placeholder="000"/>
          <label for="month">Exp date</label>
          <input type="text" id="month" placeholder="00"/>
          <label for="year">Exp year</label>
          <input type="text" id="year" placeholder="00"/><br/>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
      
    </div>
  );
}

export default App;
