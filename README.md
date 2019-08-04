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

> Remember we are versioning `node_modules` to prevent poor connection problems ont he conference
