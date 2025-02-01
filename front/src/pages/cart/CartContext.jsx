// src/context/CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [orderId, setOrderId] = useState(null);

  // Calculate total whenever cart items change
  useEffect(() => {
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(totalPrice);
  }, [cartItems]);

  const updateCart = (updater) => {
    setCartItems(prevItems => {
      const updatedCart = updater(prevItems);
      return updatedCart;
    });
  };

  const setOrderIdInContext = (id) => {
    setOrderId(id);
    console.log("Order ID stored in context:", id); 
  };

  const value = { cartItems, total, updateCart, orderId, setOrderIdInContext };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};