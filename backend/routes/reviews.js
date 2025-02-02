const express = require('express');
const router = express.Router();
const { addReview, getProductReviews } = require('../controller/reviews');
const authenticateJWT = require("../auth/auth");

router.post('/add', authenticateJWT, addReview);
router.get('/product/:productId', getProductReviews);

module.exports = router;
