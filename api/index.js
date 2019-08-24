const express = require('express');
const bodyParser = require('body-parser');
const mercadopago = require('mercadopago');
const app = express();

// Set the mercadopago credentials
mercadopago.configurations.setAccessToken('TEST-169606388010973-082414-1c20929a9443e6f84e4f7a855affe0a8-464359136');

// Attach the body-parser
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3001);
