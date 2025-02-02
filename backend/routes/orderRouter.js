const orderRouter = require("express").Router();
const {createOrder,getAllOrders,updateOrderStatus, getOrderDetails} = require("../controller/order.js")

const authenticateJWT=require("../auth/auth.js")
orderRouter.post("/create-order/:id", createOrder)
orderRouter.get("/get-all-orders", getAllOrders);
orderRouter.put('/:id/status', authenticateJWT, updateOrderStatus);
orderRouter.get('/:id/products', authenticateJWT, getOrderDetails);


module.exports = orderRouter;