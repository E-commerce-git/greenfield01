const orderRouter = require("express").Router();
const {createOrder,getAllOrders,updateOrderStatus, getOrderDetails} = require("../controller/order.js")
const dev = require('../database/config.js')

const authenticateJWT=require("../auth/auth.js")
orderRouter.post(dev.development.CREATE_ORDER_ENDPOINT, createOrder)
orderRouter.get(dev.development.GET_ALL_ORDERS_ENDPOINT, authenticateJWT,getAllOrders);
orderRouter.put(dev.development.UPDATE_ORDER_STATUS_ENDPOINT, authenticateJWT, updateOrderStatus);
orderRouter.get(dev.development.GET_ORDER_DETAILS_ENDPOINT, authenticateJWT, getOrderDetails);


module.exports = orderRouter;