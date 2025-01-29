// routes/products.js
const express = require('express');
const Product = require('../models/product');
const router = express.Router();

router.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).send({ error: 'Something went wrong!' });
  }
});


module.exports = router;
