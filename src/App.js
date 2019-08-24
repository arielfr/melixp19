import React, { Component } from 'react';
import './App.css';

class App extends Component {
  componentDidMount() {
    window.Mercadopago.setPublishableKey('TEST-bed4beea-a885-451b-8a83-4f55a3ca517b');
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
