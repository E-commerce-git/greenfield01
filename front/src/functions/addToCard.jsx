// src/functions/addToCart.js
export const addToCart = (product, quantity, updateCart) => {
  updateCart((prevCart) => {
    const existingItemIndex = prevCart.findIndex(item => item.name === product.name);

    if (existingItemIndex !== -1) {
      // Item exists, update the quantity
      const updatedCart = [...prevCart];
      updatedCart[existingItemIndex].quantity += quantity; // Add the selected quantity
      return updatedCart;
    } else {
      // Item doesn't exist, add a new one with the selected quantity
      return [...prevCart, { ...product, quantity }];
    }
  });
};