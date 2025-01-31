// src/functions/addToCart.js
export const addToCart = (product, updateCart) => {
  updateCart((prevCart) => {
    const existingItemIndex = prevCart.findIndex(item => item.name === product.name);

    if (existingItemIndex !== -1) {
      // Item exists, update the quantity
      const updatedCart = [...prevCart];
      updatedCart[existingItemIndex].quantity += 1;
      console.log("product",product);
      
      return updatedCart;
    } else {
      console.log("product",product);
      // Item doesn't exist, add a new one
      return [...prevCart, { ...product, quantity: 1 }];
    }
  });
};