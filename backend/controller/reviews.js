const db = require('../database/connection');
const Review = db.Review;  
const Product = require('../database/model/product');
const User = require('../database/model/user');


const addReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const userId = req.user.id; 

        console.log('Adding review with data:', { productId, rating, userId }); // Debug log

        const existingReview = await Review.findOne({
            where: {
                UserId: userId,
                ProductId: productId
            }
        });

        if (existingReview) {
            
            await existingReview.update({
                rating,
                comment
            });
            return res.json(existingReview);
        }

        
        const review = await Review.create({
            rating,
            comment,
            UserId: userId,
            ProductId: productId
        });

        res.status(201).json(review);
    } catch (error) {
        console.error('Error in addReview:', error);
        res.status(500).json({ message: 'Error adding review', error: error.message });
    }
};

const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;
        
        const reviews = await Review.findAll({
            where: {
                ProductId: productId
            },
            include: [{
                model: db.User,
                attributes: ['userName']
            }],
            order: [['createdAt', 'DESC']]
        });

        res.json(reviews);
    } catch (error) {
        console.error('Error in getProductReviews:', error);
        res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
};

module.exports = {
    addReview,
    getProductReviews
};