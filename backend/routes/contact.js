const express = require("express");
const contactRoutes = express.Router();

const contactController = require("../controller/contactController");

contactRoutes.post("/send", contactController.sendEmail);

module.exports = contactRoutes;
