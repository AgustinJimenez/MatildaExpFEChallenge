import React from 'react';
import logo from '../logo.png';
import './App.css';
import Form from './Form';

function App() {
  return (
    <div className="App">
      <header>
        <img src={logo} className="logo" alt="Matilda logo" />
        <h1>Matilda Typeahead</h1>
      </header>
      <Form />
    </div>
  );
}

export default App;
