import React, { useState, useEffect } from 'react';
import { addToCart } from "../functions/addToCard";
import { useCart } from '../pages/cart/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../pages/wishlist/WishlistContext';
import axios from 'axios';
import { Heart } from 'lucide-react';

export default function ProductCard({ product, onDelete, onAddReview }) {
  const { updateCart } = useCart();
  const { user } = useAuth();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const isFavorite = wishlistItems.some(item => item.id === product.id);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(product.userRating || 0);
  const [reviews, setReviews] = useState([]);
  const [reviewCount, setReviewCount] = useState(product.reviewCount || 0); // Add reviewCount state

  // Fetch reviews for the product
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/reviews/product/${product.id}`);
        if (response.status === 200) {
          setReviews(response.data);
          setReviewCount(response.data.length); // Update reviewCount based on fetched reviews
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [product.id]);

  const handleAddToCart = () => {
    addToCart(product, updateCart);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/product/${product.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (onDelete) {
        onDelete(product.id);
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFromWishlist(product);
    } else {
      addToWishlist(product);
    }
  };

  const handleRatingClick = async (rating) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to rate products');
        return;
      }
      
      await axios.post(`http://localhost:3000/api/reviews/add`, 
        { productId: product.id, rating, comment: '' },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      // Update the product's average rating
      product.averageRating = ((product.averageRating * reviewCount) + rating) / (reviewCount + 1);
      setReviewCount(reviewCount + 1); // Increment reviewCount
      setSelectedRating(rating);
      
      // If onAddReview is provided, call it
      if (onAddReview) {
        onAddReview(product.id, rating, '');
      }

      // Refresh reviews after submission
      const response = await axios.get(`http://localhost:3000/api/reviews/product/${product.id}`);
      if (response.status === 200) {
        setReviews(response.data);
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating. Please try again.');
    }
  };

  if (!product) {
    return null;
  }

  return (
    <div className="relative bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      {/* Discount Badge */}
      {product.discount && (
        <div className="absolute top-3 left-3 bg-[#DB4444] text-white text-sm px-2 py-1 rounded">
          -{product.discount}%
        </div>
      )}
      
      {/* Favorite Button */}
      <button 
        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition-colors duration-200"
        onClick={handleFavoriteClick}
      >
        <Heart 
          className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-800'}`} 
        />
      </button>

      {/* Product Image */}
      {product.imageUrl && (
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-48 object-contain mb-4"
        />
      )}

      {/* Add to Cart Button */}
      <button 
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors mb-3" 
        onClick={handleAddToCart}
      >
        Add To Cart
      </button>

      {/* Product Details */}
      <h3 className="font-medium text-base mb-2">{product.name}</h3>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[#DB4444] text-base font-medium">
          ${product.price}
        </span>
        {product.discount && (
          <span className="text-gray-500 line-through text-base">
            ${(product.price * (1 + product.discount/100)).toFixed(2)}
          </span>
        )}
      </div>

      {/* Rating Selection */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex">
          {[...Array(5)].map((_, index) => (
            <button
              key={index}
              onClick={() => handleRatingClick(index + 1)}
              onMouseEnter={() => setHoverRating(index + 1)}
              onMouseLeave={() => setHoverRating(0)}
              className="focus:outline-none"
            >
              <svg
                className={`w-5 h-5 ${
                  index < (hoverRating || selectedRating || product.averageRating || 0)
                    ? 'text-[#FFAD33] fill-current'
                    : 'text-gray-300'
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>
        <span className="text-gray-500 text-sm">({reviewCount} reviews)</span> {/* Use reviewCount state */}
      </div>

      {/* Reviews Section */}
      <div className="mt-4">
        <h4 className="font-medium mb-2">Reviews</h4>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="border-b py-2">
              <div className="flex items-center mb-1">
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`text-yellow-400 ${index < review.rating ? 'fill-current' : 'text-gray-300'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  by {review.User?.userName || 'Anonymous'}
                </span>
              </div>
              <p className="text-gray-700 text-sm">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No reviews yet.</p>
        )}
      </div>

      {/* Additional Details */}
      {product.size && (
        <div className="mt-2 text-sm text-gray-500">
          Size: {product.size}
        </div>
      )}
      <div className="mt-2 text-sm text-gray-500">
        Stock: {product.stock}
      </div>

      {/* Show delete button only if user is a seller */}
      {user?.role === 'seller' && (
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors mt-2"
        >
          Delete
        </button>
      )}
    </div>
  );
}