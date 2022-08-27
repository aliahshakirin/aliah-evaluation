import React, { useState, useEffect } from "react";
import './App.css';
import axios from 'axios';

function App() {
  const [cardnum, setCardnum] = useState('');
  const [expdate, setExpdate] = useState('');
  const [cvv, setCvv] = useState('');

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
      expdate,
      cvv
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
          <input 
            type="text" 
            id="cardnum" 
            placeholder="1234 5678 9876 5432"
            required
            onChange={(e) => setCardnum(e.target.value)}
          /><br/>
          <label for="cvv">CVV</label>
          <input 
            type="text" 
            id="cvv" 
            placeholder="000"
            required
            onChange={(e) => setCvv(e.target.value)}
          />
          <label for="month">Exp date</label>
          <input 
            type="month" 
            id="month" 
            placeholder="00"
            required
            onChange={(e) => setExpdate(e.target.value)}
          />
          <input type="submit" value="Submit"></input>
          {isWrong && <span>Invalid card &#10060;</span>}
          {isCorrect && <span>Valid card &#9989;</span>}
        </form>
      </div>
      
    </div>
  );
}

export default App;
