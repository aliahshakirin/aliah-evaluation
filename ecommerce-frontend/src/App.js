import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import './App.css';
import axios from 'axios';

function App() {
  const [cardnum, setCardnum] = useState('');
  const [expdate, setExpdate] = useState('');

  // used to render response after validation from API
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  // initialState for isCorrect and isWrong
  const initialState = false;

  // resetState whenever submit btn is click
  const resetState = () => {
    setIsCorrect(initialState);
    setIsWrong(initialState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetState();
    axios.post("/card/validate", {
      cardnum,
      expdate
    }).then((response) => {
      console.log(response.data)
      setIsCorrect(true);
    }).catch(error => {
      console.log(error);
      setIsWrong(true);
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
          <label for="cardnum">Card number </label>
          {isCorrect && <span>&#9989;</span>}
          {isWrong && <span>&#10060;</span>}
          <input 
            type="text" 
            id="cardnum" 
            placeholder="1234 5678 9876 5432"
            onChange={(e) => setCardnum(e.target.value)}
          /><br/>
          <label for="cvv">CVV</label>
          <input type="text" id="cvv" placeholder="000"/>
          <label for="month">Exp date</label>
          <input 
            type="month" 
            id="month" 
            placeholder="00"
            onChange={(e) => setExpdate(e.target.value)}
          />
          <label for="year">Exp year</label>
          <input type="text" id="year" placeholder="00"/><br/>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
      
    </div>
  );
}

export default App;
