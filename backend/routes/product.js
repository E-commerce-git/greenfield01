const express = require('express');
const Router = express.Router();
const { getAllProducts, addProduct, deleteProduct, updateProduct,Searshproductbyname } = require('../controller/product');
const dev = require("../database/config")

const authenticateJWT = require("../auth/auth")
Router.post(dev.development.ADD_PRODUCT, authenticateJWT, addProduct);
Router.get(dev.development.GET_ALL_PRODUCTS, getAllProducts);
Router.delete(dev.development.DELETE_PRODUCT, authenticateJWT, deleteProduct);
Router.put(dev.development.UPDATE_PRODUCT, authenticateJWT, updateProduct);
Router.get(dev.development.SEARCH_PRODUCT_BY_NAME, Searshproductbyname);


module.exports = Router