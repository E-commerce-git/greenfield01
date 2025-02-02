const express = require('express');
const Router = express.Router();
const { getAllProducts, addProduct, deleteProduct, updateProduct,Searshproductbyname } = require('../controller/product');

const authenticateJWT = require("../auth/auth")
Router.post('/add', authenticateJWT, addProduct);
Router.get('/products', getAllProducts);
Router.delete('/:id', authenticateJWT, deleteProduct);
Router.put('/:id', authenticateJWT, updateProduct);
Router.get('/search/:name', Searshproductbyname);


module.exports = Router