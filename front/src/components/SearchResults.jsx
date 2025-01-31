import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard'; 

const SearchResults = () => {
  const { query } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/product/search/${query}`);
        console.log(response, "res");

        // Filter the products based on the first character
        const filteredProducts = response.data.product.filter(product =>
          product.name.charAt(0).toLowerCase() === query.charAt(0).toLowerCase()
        );

        setProducts(filteredProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Render ProductCard for each product */}
          {products.map((product) => (
            <ProductCard key={product.id} product={product} /> 
          ))}
        </div>
      ) : (
        <p>No products found starting with "{query.charAt(0)}".</p>
      )}
    </div>
  );
};

export default SearchResults;
