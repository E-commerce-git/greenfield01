const express = require('express');
const router = express.Router();
const { addReview, getProductReviews } = require('../controller/reviews');
const authenticateJWT = require("../auth/auth");
const dev = require("../database/config");


router.post(dev.development.ADD_REVIEW, authenticateJWT, addReview);
router.get(dev.development.GET_PRODUCT_REVIEWS, getProductReviews);

module.exports = router;
