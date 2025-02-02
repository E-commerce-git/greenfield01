const {addToCart,insertIntoOrderProduct,removeFromCart,updateCart,getAllProductOrders}= require("../controller/orderProduct.js")
const orderProductRouter = require("express").Router()

orderProductRouter.post("/add-to-cart", addToCart)
orderProductRouter.delete("/remove-from-cart/:OrderId/:productId", removeFromCart) 

orderProductRouter.post("/insert-into-order-product", insertIntoOrderProduct) 


orderProductRouter.put("/update-cart", updateCart)

orderProductRouter.get("/get-all-product-orders", getAllProductOrders);



module.exports=orderProductRouter
