import React, { Component } from 'react';
import './App.css';

class App extends Component {
  componentDidMount() {
    window.Mercadopago.setPublishableKey('TEST-************');
  }

  render() {
    return (
      <div className="App">
        <h1>Checkout</h1>
      </div>
    )
  };
}

export default App;
