// src/components/ProductCard.js
import React from 'react';
import { addToCart } from "../functions/addToCard";
import { useCart } from '../pages/cart/CartContext'; // Import useCart

export default function ProductCard({ product }) {
  const { updateCart } = useCart(); // Get updateCart from context

  const handleAddToCart = () => {
    addToCart(product, updateCart);
  };

  return (
    <div className="relative bg-white p-3 rounded-lg">
      {/* Discount Badge */}
      {product.discount && (
        <div className="absolute top-3 left-3 bg-[#DB4444] text-white text-sm px-2 py-1 rounded">
          -{product.discount}%
        </div>
      )}
      
      {/* Action Buttons */}
      <div className="absolute top-3 right-3 flex flex-col gap-2">
        <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      </div>

      {/* Product Image */}
      <img 
        src={product.imageUrl} 
        alt={product.name} 
        className="w-full h-48 object-contain mb-4"
      />

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

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`w-4 h-4 ${index < (product.rating || 0) ? 'text-[#FFAD33]' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-gray-500 text-sm">({product.reviews || 0})</span>
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
    </div>
  );
}