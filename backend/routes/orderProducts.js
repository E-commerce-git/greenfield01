const {addToCart,removeFromCart,updateCart}= require("../controller/orderProduct.js")
const orderProductRouter = require("express").Router()

orderProductRouter.post("/add-to-cart", addToCart)
orderProductRouter.delete("/remove-from-cart/:OrderId/:productId", removeFromCart)

orderProductRouter.put("/update-cart", updateCart)


module.exports=orderProductRouter
