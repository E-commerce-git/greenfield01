import React, { useState } from 'react';
import products from '../products.json';

export default function ProductList() {
  const [cart, setCart] = useState([]);

  // Add product to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      return [...prevCart, product];
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Product Image */}
            <div className="relative">
              {/* Discount Badge */}
              {product.discount && (
                <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  -{product.discount}%
                </span>
              )}
              <img
                src={product.image || "https://via.placeholder.com/300"} // Fallback image if no image is provided
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              {/* Cart (Panier) Icon */}
              <button
                onClick={() => addToCart(product)}
                className="absolute bottom-6 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-200"
              >
                {/* Cart Icon */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </button>
            </div>

            {/* Product Details */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
              <p className="text-sm text-gray-600 mt-2">{product.description}</p>
              <div className="flex items-center justify-between mt-4">
                <p className="text-lg font-bold text-gray-900">${product.price}</p>
                {/* Rating (if available) */}
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <span className="text-sm text-gray-600 ml-1">4.5</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
