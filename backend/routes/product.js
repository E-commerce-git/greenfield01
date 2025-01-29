const express = require('express');
const Router = express.Router();
const { getAllProducts,addProduct} = require('../controller/product');

const authenticateJWT=require("../auth/auth")
Router.post('/add', authenticateJWT,addProduct);
Router.get('/products',getAllProducts);


module.exports = Router