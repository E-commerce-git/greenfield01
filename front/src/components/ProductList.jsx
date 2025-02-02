import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Carousel from './carousel';
import CategoryCarousel from './CategoryCarousel';
import CountdownTimer from './CountdownTimer';
import ProductCard from './ProductCard';
import ProductDetails from '../pages/Product_Details';
import { Heart } from 'lucide-react';
import { useWishlist } from '../pages/wishlist/WishlistContext';

export default function ProductList({ showDetails = false }) {
  const { categoryId, id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const [reviews, setReviews] = useState({});

  useEffect(() => {
    fetchCategories();
    if (categoryId) {
      setSelectedCategory(categoryId);
      fetchProductsByCategory(categoryId);
    } else if (id) {
      fetchProducts();
    } else {
      fetchProducts();
    }
  }, [categoryId, id]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/category/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data.categories);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/product/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      // Ensure each product has review data
      const productsWithReviews = data.products.map(product => ({
        ...product,
        averageRating: product.averageRating || 0,
        reviewCount: product.reviewCount || 0
      }));
      setProducts(productsWithReviews);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsByCategory = async (categoryId) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/category/${categoryId}/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      // Ensure each product has review data
      const productsWithReviews = data.products.map(product => ({
        ...product,
        averageRating: product.averageRating || 0,
        reviewCount: product.reviewCount || 0
      }));
      setProducts(productsWithReviews);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  // Function to add a review
  const addReview = (productId, rating, comment) => {
    setReviews(prev => ({
      ...prev,
      [productId]: [
        ...(prev[productId] || []),
        {
          id: Date.now(),
          rating,
          comment,
          userName: 'You' // Since we're not using the backend, we'll just show 'You'
        }
      ]
    }));
  };

  // Calculate average rating and review count for a product
  const getReviewStats = (productId) => {
    const productReviews = reviews[productId] || [];
    const averageRating = productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length || 0;
    return {
      averageRating: isNaN(averageRating) ? 0 : averageRating,
      reviewCount: productReviews.length
    };
  };

  if (showDetails && id) {
    const selectedProduct = products.find(product => String(product.id) === String(id));
    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (!selectedProduct) return <div className="flex justify-center items-center h-screen">Product not found</div>;
    console.log('Selected product being passed:', selectedProduct);
    return <ProductDetails product={selectedProduct} productList={products} />;
  }

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Main Layout */}
      <div className="flex flex-col gap-8">
        {/* Carousel Section */}
        {!categoryId ? (
          <div className="flex gap-4">
            {/* Categories Sidebar */}
            <div className="w-[217px]">
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <div className="bg-white border border-gray-200 rounded">
                {categories.map(category => (
                  <div
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className={`flex justify-between items-center px-4 py-2.5 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                      selectedCategory === category.id ? 'bg-gray-100' : ''
                    }`}
                  >
                    <span className="text-sm text-gray-600">{category.name}</span>
                    <span className="text-gray-400">›</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Main Carousel */}
            <div className="flex-1">
              <Carousel />
            </div>
          </div>
        ) : (
          <CategoryCarousel categoryId={categoryId} />
        )}

        {/* Products Section */}
        <div className="mt-8">
          {/* Flash Sales Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-[#DB4444] text-base">Today's</div>
              <h2 className="text-2xl font-bold">Flash Sales</h2>
            </div>
            
            <div className="flex items-center gap-4">
              <CountdownTimer />
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => {
              const { averageRating, reviewCount } = getReviewStats(product.id);
              return (
                <div 
                  key={product.id} 
                  className="relative bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  {/* Favorite Icon */}
                  <button 
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition-colors duration-200 z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (wishlistItems.some(item => item.id === product.id)) {
                        removeFromWishlist(product);
                      } else {
                        addToWishlist(product);
                      }
                    }}
                  >
                    <Heart 
                      className={`w-5 h-5 ${
                        wishlistItems.some(item => item.id === product.id) 
                          ? 'text-red-500 fill-current' 
                          : 'text-gray-800'
                      }`} 
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

                  {/* View Button */}
                  <button
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors mb-3"
                  >
                    View Product
                  </button>

                  {/* Dynamic Rating Hearts */}
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          className={`w-4 h-4 ${index < averageRating ? 'text-[#FFAD33]' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-500 text-sm">({reviewCount} reviews)</span>
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
            })}
          </div>

          {/* View All Products Button */}
          <div className="text-center mt-8">
            <button className="bg-[#DB4444] text-white px-8 py-2 rounded hover:bg-red-600 transition-colors">
              View All Products
            </button>
          </div>
            {/* New Arrival Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">New Arrival</h2>
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 bg-black text-white p-6 rounded-lg relative">
                <img src="https://cdn.galleries.smcloud.net/t/galleries/gf-4Axw-xWNu-6aCr_playstation-5-994x828.jpg" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold">PlayStation 5</h3>
                  <p className="text-sm">Black and White version of the PS5 coming out on sale.</p>
                  <button className="mt-2 bg-white text-black px-4 py-2 rounded">Shop Now</button>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-gray-800 text-white p-6 rounded-lg">
                  <h3 className="text-xl font-bold">Women's Collections</h3>
                  <p className="text-sm">Featured woman collections that give you another vibe.</p>
                  <button className="mt-2 bg-white text-black px-4 py-2 rounded">Shop Now</button>
                </div>
                <div className="bg-gray-800 text-white p-6 rounded-lg">
                  <h3 className="text-xl font-bold">Speakers</h3>
                  <p className="text-sm">Amazon wireless speakers.</p>
                  <button className="mt-2 bg-white text-black px-4 py-2 rounded">Shop Now</button>
                </div>
                <div className="bg-gray-800 text-white p-6 rounded-lg">
                  <h3 className="text-xl font-bold">Perfume</h3>
                  <p className="text-sm">GUCCI INTENSE OUD EDP.</p>
                  <button className="mt-2 bg-white text-black px-4 py-2 rounded">Shop Now</button>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="flex justify-around mt-8">
            <div className="text-center">
              {/* <img src="path/to/delivery-icon.svg" alt="Free and Fast Delivery" className="mx-auto mb-2" /> */}
              <h4 className="font-bold">FREE AND FAST DELIVERY</h4>
              <p className="text-sm">Free delivery for all orders over $140</p>
            </div>
            <div className="text-center">
              {/* <img src="path/to/customer-service-icon.svg" alt="24/7 Customer Service" className="mx-auto mb-2" /> */}
              <h4 className="font-bold">24/7 CUSTOMER SERVICE</h4>
              <p className="text-sm">Friendly 24/7 customer support</p>
            </div>
            <div className="text-center">
              {/* <img src="path/to/money-back-icon.svg" alt="Money Back Guarantee" className="mx-auto mb-2" /> */}
              <h4 className="font-bold">MONEY BACK GUARANTEE</h4>
              <p className="text-sm">We return money within 30 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



// Helper function to get category icons
const getCategoryIcon = (categoryName) => {
  const icons = {
    'Phones': (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <path d="M38.9375 6.125H17.0625C15.5523 6.125 14.3125 7.36484 14.3125 8.875V47.125C14.3125 48.6352 15.5523 49.875 17.0625 49.875H38.9375C40.4477 49.875 41.6875 48.6352 41.6875 47.125V8.875C41.6875 7.36484 40.4477 6.125 38.9375 6.125Z" 
          stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'Computers': (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <path d="M46.6667 9.33334H9.33333C8.04467 9.33334 7 10.378 7 11.6667V35C7 36.2887 8.04467 37.3333 9.33333 37.3333H46.6667C47.9553 37.3333 49 36.2887 49 35V11.6667C49 10.378 47.9553 9.33334 46.6667 9.33334Z" 
          stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'SmartWatch': (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <path d="M35 14H21C17.134 14 14 17.134 14 21V35C14 38.866 17.134 42 21 42H35C38.866 42 42 38.866 42 35V21C42 17.134 38.866 14 35 14Z" 
          stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    // Add other category icons following the same pattern...
  };

  return icons[categoryName] || (
    // Default icon if category doesn't match
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <rect x="8" y="8" width="40" height="40" rx="20" stroke="black" strokeWidth="2"/>
    </svg>
  );
};