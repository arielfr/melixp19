const express = require('express');
const bodyParser = require('body-parser');
const mercadopago = require('mercadopago');
const app = express();
const port = 3001;

// Set the mercadopago credentials
mercadopago.configurations.setAccessToken('TEST-*******');

// Attach the body-parser
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/pay', function (req, res) {
  const token = req.body.token;
  const paymentMethodId = req.body.paymentMethodId;
  const email = req.body.email;

  console.log(`Parameters receive ${JSON.stringify(req.body)}`);

  // Creating payment payload
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

  // Do payment
  mercadopago.payment.save(paymentData).then((payment) => {
    console.log('Payment done!');
    res.send(payment);
  }).catch(function (error) {
    console.log(`There was an error making the payment ${error.message}`);
    res.status(500).send({
      message: error.message
    });
  });
});

console.log(`Application listening on port ${port}`);

app.listen(port);
