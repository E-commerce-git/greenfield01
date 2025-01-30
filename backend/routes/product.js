const express = require('express');
const Router = express.Router();
const { getAllProducts, addProduct, deleteProduct, updateProduct } = require('../controller/product');

const authenticateJWT = require("../auth/auth")
Router.post('/add', authenticateJWT, addProduct);
Router.get('/products', getAllProducts);
Router.delete('/:id', authenticateJWT, deleteProduct);
Router.put('/:id', authenticateJWT, updateProduct);

module.exports = Router