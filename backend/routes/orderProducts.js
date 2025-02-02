const {addToCart,insertIntoOrderProduct,removeFromCart,updateCart,getAllProductOrders}= require("../controller/orderProduct.js")
const orderProductRouter = require("express").Router()
const dev =require("../database/config.js")

const authenticateJWT=require("../auth/auth.js")
orderProductRouter.post(dev.development.ADD_TO_CART, addToCart)
orderProductRouter.delete(dev.development.REMOVE_FROM_CART, removeFromCart) 

orderProductRouter.post(dev.development.INSERT_INTO_ORDER_PRODUCT, insertIntoOrderProduct) 


orderProductRouter.put(dev.development.UPDATE_CART, updateCart)

orderProductRouter.get(dev.development.GET_ALL_PRODUCT_ORDERS,getAllProductOrders);



module.exports=orderProductRouter
