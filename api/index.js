const express = require('express');
const bodyParser = require('body-parser');
const mercadopago = require('mercadopago');
const app = express();

// Set the mercadopago credentials
mercadopago.configurations.setAccessToken('TEST-********');

// Attach the body-parser
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/pay', function (req, res) {
  const token = req.body.token;
  const paymentMethodId = req.body.paymentMethodId;
  const email = req.body.email;

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

  mercadopago.payment.save(paymentData).then(function (payment) {
    res.send(payment);
  }).catch(function (error) {
    res.status(500).send({
      message: error.message
    });
  });
});

app.listen(3001);
