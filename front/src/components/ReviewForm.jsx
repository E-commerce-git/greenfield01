import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ReviewForm({ productId, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user) {
        alert('Please login to submit a review');
        return;
      }
      await onSubmit(productId, rating, comment);
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Error submitting review:', error);
      if (error.response) {
        alert(error.response.data.message || 'Failed to submit review');
      } else {
        alert('Network error. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, index) => (
          <button
            type="button"
            key={index}
            onClick={() => setRating(index + 1)}
            className={`text-2xl ${
              index < rating ? 'text-[#FFAD33] fill-current' : 'text-gray-300'
            }`}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
        className="w-full p-2 border rounded mb-2"
        rows="3"
      />
      <button
        type="submit"
        className="bg-[#DB4444] text-white px-4 py-2 rounded hover:bg-[#DB4444]/90"
        disabled={!user}
      >
        {user ? 'Submit Review' : 'Login to Review'}
      </button>
    </form>
  );
} 