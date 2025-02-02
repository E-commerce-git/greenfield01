import React, { useEffect, useState } from 'react';
import { useWishlist } from './WishlistContext';
import ProductCard from '../../components/ProductCard';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const { wishlistItems } = useWishlist();
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map(product => (
            <ProductCard 
              key={product.id} 
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="flex justify-center mb-6">
            <Heart className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-xl text-gray-600 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">Start adding products to your wishlist by clicking the heart icon!</p>
          <Link 
            to="/"
            className="bg-[#DB4444] text-white px-6 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      )}
    </div>
  );
} 