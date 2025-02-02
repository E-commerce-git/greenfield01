const express = require('express');
const { createPaymentIntent } = require('../controller/payment');
const dev = require("../database/config.js")

const paymentRoutes = require("express").Router()

paymentRoutes.post(dev.development.CREATEPAYMENTINTENT, createPaymentIntent);

module.exports = paymentRoutes;


