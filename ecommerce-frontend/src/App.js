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
      <h1>My ecommerce website</h1>
    </div>
  );
}

export default App;
