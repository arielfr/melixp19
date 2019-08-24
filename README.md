# Mercado Livre Experience 2019 - São Paulo

![MeliXP-Logo](https://user-images.githubusercontent.com/4379982/63639667-8e704200-c66c-11e9-9cac-84005369849e.png)

This is the repository for the talk "Como desenvolver uma integração de pagamentos em menos de 30 minutos" on Mercado Livre Experience 2019

## Brief

In this talk we are going to be making an end-to-end integration using the Mercado Pago SDK. We are going to be making the *Frontend* and *Backend*.

### Language, libraries, frameworks & more

For this live coding we are going to be using NodeJS with the next packages:

* [create-react-app](https://www.npmjs.com/package/create-react-app) - Frontend Application
* [express](https://npmjs.com/package/express) - Backend for communication with Mercado Pago APIs
* [mercadopago](https://npmjs.com/package/mercadopago) - Mercado Pago official SDK

> If you have any doubt about NodeJS you can see reference [here](https://www.freecodecamp.org/news/what-exactly-is-node-js-ae36e97449f5/)

## Steps / Branching system

To prevent poor internet connection during the talk, I divided this repository in the steps that we are going to be following. The `node_modules` folder is going to be versioned

### Step 0 - Initial Commit

This is the initial commit. The repository is going to be empty here...

![Dr_UtZXUwAEjm7H](https://user-images.githubusercontent.com/4379982/63639767-df346a80-c66d-11e9-84f6-c609f90469cc.jpg)

### Step 1 - Creating Application

Now we are going to be creating a basic React application using [create-react-app](https://www.npmjs.com/package/create-react-app)

```
$ npx create-react-app .
```

Once this command was executed we can run the server:

```
$ npm run start
```

![Empty-React-Page](https://user-images.githubusercontent.com/4379982/63639819-ad6fd380-c66e-11e9-8a54-88ca33576583.png)

### Step 2 - Adding & Configuring SDK

First we remove all the styles and HTML added by [create-react-app](https://www.npmjs.com/package/create-react-app).

Now, we are finally ready to start the integration. Go to the [Developer Site](https://developers.mercadopago.com) and to the API section:

* [Receive a payment with Credit Card](https://www.mercadopago.com.br/developers/pt/guides/payments/api/receiving-payment-by-card/)

Then you need to follow the documentation step by step

#### Add the Javascript SDK

Add `mercadopago.js` to your HTML. This is the Mercado Pago Javascript SDK

On the `index.html` file in your `/public` folder, you need to add the current `script`

```html
<script src="https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js"></script>
```

> To prevent internet connection failure during the talk I copied the script on the `/public` folder


#### Configure your credentials

This is the first thing you want to do when your page starts up. To achieve this in a React lifecycle, this needs to be done it on your `componentDidMount` method. This method is going to guarantee that the DOM is ready and the `mercadopago.js` is lodaded on them

```javascript
componentDidMount() {
  window.Mercadopago.setPublishableKey('TEST-0f1ac411-40d9-494c-8c26-a7e6795e70cb');
}
```

> This credential is from a test user. It was refreshed after the talk ended to preventing impersonification. Replace it with your own one.

To achieve this we need to convert the `App.js` to a Class (Class Component). Why? Because [create-react-app](https://www.npmjs.com/package/create-react-app) created the `App.js` a stateless component by default.

```javascript
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  componentDidMount() {
    window.Mercadopago.setPublishableKey('TEST-0f1ac411-40d9-494c-8c26-a7e6795e70cb');
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

Yeah! :raised_hands: We just created an empty Application and configured the Mercado Pago SDK.

### Step 3 - Payment Form

Like every Checkout out there we need a payment form. In this form we are going to be asking the basic information to process the payment and prevent fraud payments. This form is ready for you on the [Developers Site](https://www.mercadopago.com.br/developers/pt/guides/payments/api/receiving-payment-by-card/).

Not so fast :hand:! This form is ready for plain HTTP, but not for React

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
          defaultValue="test_user_71425066@testuser.com"
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
          maxLength={16}
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

> Note that the document type selector is empty. We are going to talk about this later

The form looks really ugly with the CSS default by the browser. Let's add this CSS sugar :nail_care:

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

### Step 4 - Guessing, Card Token, Identification Type & Events

Looking what we just:

- Created the application
- Added and configured the Mercado Pago SDK
- Added and adapted the Payment Form

The form doesn't work by itself, we need to attach some events to the input and use the SDK to initialize the magic.

#### Identification Types

Remember that I told you that the Identification `<select>` was empty?. This is because the SDK provides you a method (`getIdentificationTypes`) to auto populate this field using your credentials
 
````javascript
window.Mercadopago.getIdentificationTypes();
````

We need to add this method (`getIdentificationTypes`) inside `componentDidMount`

> This method is in charge of populating the identification types `<select>`

#### Card Guessing

One of the fields required to process a payment is the `Payment Method Id`* entered by the user. For getting this field the SDK provides you a method call `getPaymentMethod`that using the first 6 digits of the credit card number entered is going to guess the `Payment Method Id`.

To do this we need to add the `onChange` prop on the credit card number `<input>`

```javascript
<input
  type="text"
  id="cardNumber"
  data-checkout="cardNumber"
  placeholder="4509953566233704"
  autoComplete="off"
  onChange={this.guessingPaymentMethod}
/>
```

```javascript
  guessingPaymentMethod(event) {
    const bin = event.currentTarget.value;

    if (bin.length >= 6) {
      window.Mercadopago.getPaymentMethod({
        //"bin": bin.substring(0, 6),
      }, this.setPaymentMethodInfo);
    }
  }
```

Then we need to create the method `setPaymentMethodInfo` that we are using as a callback on `guessingPaymentMethod`. This method is going to be in charge of population the hidden `<input>` with the value from the guessing

```javascript
  setPaymentMethodInfo(status, response) {
    if (status === 200) {
      const paymentMethodElement = document.querySelector('input[name=paymentMethodId]');

      if (paymentMethodElement) {
        paymentMethodElement.value = response[0].id;
      } else {
        const form = document.querySelector('#pay');
        const input = document.createElement('input');

        input.setAttribute('name', 'paymentMethodId');
        input.setAttribute('type', 'hidden');
        input.setAttribute('value', response[0].id);

        form.appendChild(input);
      }
    } else {
      alert(`Payment Method not Found`);
    }
  };
```

#### Tokenization

This is the process when all of the payer information is converted into a safe id to prevent hackers to stole of your information.

How we do this? The SDK Provides a method call `createToken` to convert this information into the safe id (token)

To achieve this we need to attach a `onSubmit` event for the checkout form

```javascript
<form action="" method="post" id="pay" name="pay" onSubmit={this.onSubmit}>
```

Then we need to add the `onSubmit` method that is going to use the `createToken` provided by the SDK

```javascript
  onSubmit(event) {
    event.preventDefault();

    const form = document.querySelector('#pay');

    window.Mercadopago.createToken(form, this.sdkResponseHandler); // The function "sdkResponseHandler" is defined below

    return false;
  }
```

This method is going to generate the safe id (`token`) to be added on the on the `<form>`. To do this we need copy the example from the [Developers Site](https://www.mercadopago.com.br/developers/pt/guides/payments/api/receiving-payment-by-card/).

```javascript
  sdkResponseHandler(status, response) {
    if (status !== 200 && status !== 201) {
      alert("verify filled data");
    } else {
      const form = document.querySelector('#pay');
      const card = document.createElement('input');
      
      card.setAttribute('name', 'token');
      card.setAttribute('type', 'hidden');
      card.setAttribute('value', response.id);
      
      form.appendChild(card);
      form.submit();
    }
  };
```

If you see this example, once the `token` is generated is going to submit the form. This is causing that the `token` is generated again and before its generated again the form is submitted again. We need to add a variable on the state to stop this.

```javascript
  constructor(props){
    super(props);

    this.setPaymentMethodInfo = this.setPaymentMethodInfo.bind(this);
    this.guessingPaymentMethod = this.guessingPaymentMethod.bind(this);
    this.sdkResponseHandler = this.sdkResponseHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      submit: false,
    };
  }
```

Then we need to prevent the re generation of the `token` on the `onSubmit` method

```javascript
  onSubmit(event) {
    event.preventDefault();

    if (!this.state.submit) {
      const form = document.getElementsByTagName('form')[0];
      window.Mercadopago.createToken(form, this.sdkResponseHandler);
    }
  }
```

Now we just need to update this state variable in order to work correctly

```javascript
  sdkResponseHandler(status, response) {
    if (status !== 200 && status !== 201) {
      alert("verify filled data");

      this.setState({
        submit: false,
      });
    } else {
      this.setState({
        submit: true,
      });

      const form = document.querySelector('#pay');
      const card = document.createElement('input');

      card.setAttribute('name', 'token');
      card.setAttribute('type', 'hidden');
      card.setAttribute('value', response.id);

      form.appendChild(card);
      form.submit();
    }
  };
```

#### Party!

You just did the payment form and capture all the necessary information to process the payment

![Party Gif](https://user-images.githubusercontent.com/4379982/62431004-00064180-b6fa-11e9-83a0-c05fae609ba4.gif)

###  Step 5 - API Side

This form is going to sent the following information to the backend:

* email
* paymentMethodId
* token

Now we need to make an API and integrate it with mercadopago

#### Creating the API

Let's start creating a `api` folder and init the project

```
$ npm init
```

Install the following dependencies

* [express](https://npmjs.com/package/express) - For the web server
* [body-parser](https://npmjs.com/package/body-parser)
* [mercadopago](https://npmjs.com/package/mercadopago) - Official NodeJS mercadopago API

And create an empty `index.js` file

```
$ touch index.js
```

###  Step 6

Now we need to create a `express` basic server and attach the `body-parser`

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Attach the body-parser
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3001);
```

Now that we have a server we need to add the `mercadopago` SDK and configure it

```javascript
const mercadopago = require('mercadopago');

mercadopago.configurations.setAccessToken('TEST-********');
```

###  Step 7

Now we just need a route to receive the data from the form and make the payment

```javascript
app.post('/pay', function (req, res) {
  // Route handler
});
```

Once we create the route we need to get the form data

```javascript
const token = req.body.token;
const paymentMethodId = req.body.paymentMethodId;
const email = req.body.email;
```

Then create the payload to be send to the Payments API

```javascript
  const paymentData = {
    transaction_amount: 100,
    token: token,
    description: 'MeliXP 2019 - Test Payment',
    installments: 1,
    payment_method_id: paymentMethodId,
    payer: {
      email: email,
    },
  };
```

Do the payment

```javascript
  mercadopago.payment.save(paymentData).then(function (payment) {
    res.send(payment);
  }).catch(function (error) {
    res.status(500).send({
      message: error.message
    });
  });
```

Now we just need to change the `action` property on the form and do your payment

```javascript
<form action="http://localhost:3001/pay" method="post" id="pay" name="pay" onSubmit={this.onSubmit}>
```

That's it!
