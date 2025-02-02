import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Carousel from './carousel';
import CategoryCarousel from './CategoryCarousel';
import CountdownTimer from './CountdownTimer';
import ProductCard from './ProductCard';
import ProductDetails from '../pages/Product_Details';
import { Heart } from 'lucide-react';
import { useWishlist } from '../pages/wishlist/WishlistContext';
import apis, { makeRequest } from '../../stockApi/apistock';

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
      const response = await makeRequest(apis.categories.getAll);
      console.log('Categories response:', response);
      const categoriesData = response?.data?.categories || [];
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to load categories');
      setCategories([]);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await makeRequest(apis.products.getAll);
      console.log('Products response:', response);
      
      const productsData = response?.data?.products || [];
      setProducts(productsData);
      setError(null);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsByCategory = async (categoryId) => {
    try {
      setLoading(true);
      const response = await makeRequest(() => apis.products.getByCategory(categoryId));
      console.log('Products by category response:', response);
      
      const productsData = response?.data?.products || [];
      setProducts(productsData);
      setError(null);
    } catch (error) {
      console.error('Error fetching products by category:', error);
      setError('Failed to load products for this category');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    navigate(`/category/${categoryId}`);
  };

  const handleProductDelete = (productId) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
  };

  const addReview = (productId, rating, comment) => {
    setReviews(prev => ({
      ...prev,
      [productId]: [
        ...(prev[productId] || []),
        {
          id: Date.now(),
          rating,
          comment,
          userName: 'You'
        }
      ]
    }));
  };

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
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {!showDetails && (
        <>
          <Carousel />
          <CategoryCarousel 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
          />
          <CountdownTimer />
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={handleProductDelete}
            />
          ))
        ) : (
          <div className="col-span-4 text-center text-gray-500">
            No products found{selectedCategory ? ' in this category' : ''}.
          </div>
        )}
      </div>
    </div>
  );
}

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
    )
  };

  return icons[categoryName] || (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <rect x="8" y="8" width="40" height="40" rx="20" stroke="black" strokeWidth="2"/>
    </svg>
  );
};