const express = require("express");
const contactRoutes = express.Router();
const dev = require("../database/config");

const contactController = require("../controller/contactController");

contactRoutes.post(dev.development.SEND, contactController.sendEmail);

module.exports = contactRoutes;
