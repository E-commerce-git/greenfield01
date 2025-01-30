// src/context/CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  // Load cart from localStorage (initial state)
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  // Calculate total whenever cart items change
  useEffect(() => {
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(totalPrice);
  }, [cartItems]);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateCart = (updatedItem) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex(item => item.name === updatedItem.name);
      if (itemIndex !== -1) {
        const updatedCart = [...prevItems];
        updatedCart[itemIndex] = updatedItem;
        return updatedCart;
      }
      return [...prevItems, updatedItem];
    });
  };

  const value = { cartItems, total, updateCart };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
