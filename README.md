# Mercado Livre Experience 2019 - São Paulo

This is the repository for the talk "Como desenvolver uma integração de pagamentos em menos de 30 minutos" for Mercado Livre Experience 2019

## Talk

In this talk we are going to be making an end-to-end integration with their API. We are going to be making the *Frontend* and *Backend*.

### Technologies

We are going to be using NodeJS with the next packages:

* [create-react-app](https://www.npmjs.com/package/create-react-app) - Frontend Application
* [express](https://npmjs.com/package/express) - Backend to integrate the API
* [mercadopago](https://npmjs.com/package/mercadopago) - Mercado Pago official API

## Steps / Branching

To prevent poor internet connection i divided this repository in steps and version the `node_modules` folder

### Step 0

Empty application. Nothing to see here...

### Step 1

In this step we are going to create a basic React application using [create-react-app](https://www.npmjs.com/package/create-react-app).

```
$ npx create-react-app .
```

Now we can run the server:

```
$ npm run start
```

> Remember we are versioning `node_modules` to prevent poor connection problems ont he conference

### Step 2

Now we are cleaning the default template of [create-react-app](https://www.npmjs.com/package/create-react-app).

We are now ready for starting the integration. We need to go to the [Developer Site](https://developers.mercadopago.com) and to the API section:

* [Receive a payment with Credit Card](https://www.mercadopago.com.br/developers/pt/guides/payments/api/receiving-payment-by-card/)

We need to follow this next steps:

1. Add `mercadopago.js` that is the Javascript SDK

On the index.html file add the current `script`

```html
<script src="https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js"></script>
```

> To prevent internet connections you can copy the script from `/public/mercadpago.js`

2. Configure your credentials

This is the first thing you want to do when your page starts up. To achieve this in a React lifecycle, you need to do it on your `componentDidMount` method

```javascript
componentDidMount() {
  window.Mercadopago.setPublishableKey('TEST-************');
}
```

Before you do this, [create-react-app](https://www.npmjs.com/package/create-react-app) creates an `App.js` as a stateless component. We need to convert it into a state component. To do this we need to change it to a class instead of a function.

```javascript
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
```

Now, you have the App created and MercadoPago configured to start implementing
