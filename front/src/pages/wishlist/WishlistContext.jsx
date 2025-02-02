import React, { createContext, useState, useEffect } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlistItems(JSON.parse(storedWishlist));
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (productId) => {
    setWishlistItems((prevItems) => {
      if (!prevItems.includes(productId)) {
        return [...prevItems, productId];
      }
      return prevItems;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prevItems) => 
      prevItems.filter((id) => id !== productId)
    );
  };

  return (
    <WishlistContext.Provider value={{ 
      wishlistItems, 
      addToWishlist,
      removeFromWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => React.useContext(WishlistContext); 