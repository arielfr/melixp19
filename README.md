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

### Step 3

Like every Checkout, now you need to implement the Payment form. The form is already on the [Developers Site](https://www.mercadopago.com.br/developers/pt/guides/payments/api/receiving-payment-by-card/) we just need to copy

```javascript
<form action="" method="post" id="pay" name="pay" >
    <fieldset>
        <ul>
            <li>
                <label for="email">Email</label>
                <input id="email" name="email" value="test_user_19653727@testuser.com" type="email" placeholder="your email"/>
            </li>
            <li>
                <label for="cardNumber">Credit card number:</label>
                <input type="text" id="cardNumber" data-checkout="cardNumber" placeholder="4509 9535 6623 3704" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete=off />
            </li>
            <li>
                <label for="securityCode">Security code:</label>
                <input type="text" id="securityCode" data-checkout="securityCode" placeholder="123" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete=off />
            </li>
            <li>
                <label for="cardExpirationMonth">Expiration month:</label>
                <input type="text" id="cardExpirationMonth" data-checkout="cardExpirationMonth" placeholder="12" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete=off />
            </li>
            <li>
                <label for="cardExpirationYear">Expiration year:</label>
                <input type="text" id="cardExpirationYear" data-checkout="cardExpirationYear" placeholder="2015" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete=off />
            </li>
            <li>
                <label for="cardholderName">Card holder name:</label>
                <input type="text" id="cardholderName" data-checkout="cardholderName" placeholder="APRO" />
            </li>
            <li>
                <label for="docType">Document type:</label>
                <select id="docType" data-checkout="docType"></select>
            </li>
            <li>
                <label for="docNumber">Document number:</label>
                <input type="text" id="docNumber" data-checkout="docNumber" placeholder="12345678" />
            </li>
        </ul>
        <input type="hidden" name="paymentMethodId" />
        <input type="submit" value="Pay!" />
    </fieldset>
</form>
```

But, not so fast, first we need to adapt the HTTP properties to be JSX compatible

````javascript
<form action="" method="post" id="pay" name="pay">
          <fieldset>
            <ul>
              <li>
                <label htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  value="test_user_19653727@testuser.com"
                  type="email"
                  placeholder="your email"
                />
              </li>
              <li>
                <label htmlFor="cardNumber">
                  Credit card number:
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  data-checkout="cardNumber"
                  placeholder="4509953566233704"
                  autoComplete="off"
                />
              </li>
              <li>
                <label htmlFor="securityCode">
                  Security code:
                </label>
                <input
                  type="text"
                  id="securityCode"
                  data-checkout="securityCode"
                  placeholder="123"
                  autoComplete="off"
                />
              </li>
              <li>
                <label htmlFor="cardExpirationMonth">
                  Expiration month:
                </label>
                <input
                  type="text"
                  id="cardExpirationMonth"
                  data-checkout="cardExpirationMonth"
                  placeholder="12"
                  autoComplete="off" />
              </li>
              <li>
                <label htmlFor="cardExpirationYear">
                  Expiration year:
                </label>
                <input
                  type="text"
                  id="cardExpirationYear"
                  data-checkout="cardExpirationYear"
                  placeholder="2015"
                  autoComplete="off"
                />
              </li>
              <li>
                <label
                  htmlFor="cardholderName">
                  Card holder name:
                </label>
                <input
                  type="text"
                  id="cardholderName"
                  data-checkout="cardholderName"
                  placeholder="APRO"
                />
              </li>
              <li>
                <label htmlFor="docType">
                  Document type:
                </label>
                <select id="docType" data-checkout="docType"></select>
              </li>
              <li>
                <label htmlFor="docNumber">Document number:</label>
                <input
                  type="text"
                  id="docNumber"
                  data-checkout="docNumber"
                  placeholder="12345678"
                />
              </li>
            </ul>
            <input
              type="hidden"
              name="paymentMethodId"
            />
            <input type="submit" value="Pay!" />
          </fieldset>
        </form>
````

> Note that the document type selector is empty

The form looks really ugly with the CSS default by the browser. Let's add this CSS sugar

```css
body {
  background: #f5f6f8;
  font-size: 14px;
}

.App {
  margin: 0 auto;
}

h1 {
  padding: 10px;
  margin-bottom: 0px;
}

form {
  margin: 0 auto;
  padding: 10px;
}

fieldset {
  padding: 0px;
  border: 0px;
}

ul {
  padding: 0px;
  margin: 0px;
  list-style: none;
}

label {
  display: block;
  margin: 5px 0px 5px 0px;
}

input,
select {
  padding: 12px 10px;
  min-width: 100%;
  box-sizing: border-box;
  border: 2px solid #eee;
  border-radius: 0px;
  height: 40px;
}

input[type=submit] {
  margin-top: 10px;
  padding: 5px 15px;
  color: white;
  background: #009ee3;
  border: 1px solid #009ee3;
  cursor: pointer;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  height: 50px;
  font-size: 14px;
}

input[type=submit]:hover {
  background: #32b3ff;
  border-color: #32b3ff;
}
```

### Step 4

Now that we have the form, we just need to attach the events & configurations methods provided by de MercadoPago Javascript SDK

1. The first method we need to call is `getIdentificationTypes` inside `componentDidMount`

````javascript
window.Mercadopago.getIdentificationTypes();
````

This method is going to populate the identification types select with the ones from the country of the public key provided


