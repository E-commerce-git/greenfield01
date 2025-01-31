import axios from "axios";

const createOrder = async (userId, cartItems, total) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/orders/create-order/${userId.id}`, { total: total });
    console.log("Order created successfully:", response.data);
    
    // Debugging: Check cartItems and ensure 'quantity' is present in each element
    console.log('Cart Items:', cartItems);
    
    // Iterating through each cart item
    cartItems.forEach(async (el) => {
      // Check if 'quantity' exists on 'el'
      if (el.quantity === undefined) {
        console.error(`Missing quantity for product ${el.id}`);
        return; // Skip this iteration if quantity is missing
      }
      
      await axios.post("http://localhost:3000/api/insert-into-order-product", {
        productId: el.id,
        quantity: el.quantity,  // Access quantity directly from 'el'
        OrderId: response.data.order.OrderId
      });
      console.log("Product added to order:", el.id);
    });
  } catch (err) {
    console.error("Error creating order:", err);
    throw new Error("Failed to create order");
  }
}
export default createOrder