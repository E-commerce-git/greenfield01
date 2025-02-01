const express = require('express');
const { createPaymentIntent } = require('../controller/payment');

const paymentRoutes = require("express").Router()

paymentRoutes.post('/create-payment-intent', createPaymentIntent);

module.exports = paymentRoutes;


