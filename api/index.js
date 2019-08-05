const express = require('express');
const bodyParser = require('body-parser');
const mercadopago = require('mercadopago');
const app = express();

// Set the mercadopago credentials
mercadopago.configurations.setAccessToken('TEST-********');

// Attach the body-parser
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3001);
