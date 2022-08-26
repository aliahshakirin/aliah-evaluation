import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  useEffect(() => {
    fetch("/hello")
     .then((response) => console.log(response.json()));
   }, []);
  
  return (
    <div className="App">
      <div className="header">
        <h1>My ecommerce website</h1>
        <h2>Enter your payment details</h2>
      </div>
    
      <div className="info">
        <form>
          <label for="cardnum">Card number</label>
          <input type="text" id="cardnum"/><br/>
          <label for="cvv">CVV</label>
          <input type="text" id="cvv"/>
          <label for="month">Exp month</label>
          <input type="number" id="month"/>
          <label for="year">Exp year</label>
          <input type="number" id="year"/><br/>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
      
    </div>
  );
}

export default App;
