import React, { useEffect, useState } from 'react';
import { useWishlist } from './WishlistContext';
import ProductCard from '../../components/ProductCard';

export default function Wishlist() {
  const { wishlistItems } = useWishlist();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products from your backend
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/product/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data.products || []); // Ensure products is an array
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products to only include those in the wishlist
  const wishlistProducts = products.filter(product => 
    wishlistItems.includes(product.id)
  );

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
      {wishlistProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                description: product.description,
                stock: product.stock,
                size: product.size,
                // Add other product properties as needed
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-xl text-gray-600 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-500">Start adding products to your wishlist by clicking the heart icon!</p>
        </div>
      )}
    </div>
  );
} 