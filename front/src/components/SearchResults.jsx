import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import apis, { makeRequest } from '../../stockApi/apistock';

const SearchResults = () => {
  const { query } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const response = await makeRequest(() => apis.products.search(query));
        console.log('Search response:', response);
        
        // Extract products from the response
        const searchResults = response?.data?.products || [];
        setProducts(searchResults);
        setError(null);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setError("Failed to fetch search results. Please try again later.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#DB4444]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center text-red-500 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 p-4">
          No products found for "{query}".
        </div>
      )}
    </div>
  );
};

export default SearchResults;
