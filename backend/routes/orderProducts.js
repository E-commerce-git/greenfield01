const {addToCart,insertIntoOrderProduct,removeFromCart,updateCart}= require("../controller/orderProduct.js")
const orderProductRouter = require("express").Router()

orderProductRouter.post("/add-to-cart", addToCart)
orderProductRouter.delete("/remove-from-cart/:OrderId/:productId", removeFromCart) 

orderProductRouter.post("/insert-into-order-product", insertIntoOrderProduct) 


orderProductRouter.put("/update-cart", updateCart)


module.exports=orderProductRouter
