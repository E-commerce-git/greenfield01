export const addToCart = (name, description, price,imageUrl) => {
    // Get the cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Check if the item already exists in the cart
    const existingItemIndex = cart.findIndex(item => item.name === name && item.description === description);
  
    if (existingItemIndex !== -1) {
      // Item exists, update the quantity
      cart[existingItemIndex].quantity += 1;
    } else {
      // Item doesn't exist, add a new one
      cart.push({ name, description, price, quantity: 1 });
    }
  
    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  