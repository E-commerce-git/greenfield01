const orderRouter = require("express").Router();
const {createOrder} = require("../controller/order.js")


orderRouter.post("/create-order/:id", createOrder)
module.exports = orderRouter;