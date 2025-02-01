import axios from "axios";



const createOrder = async (userId, cartItems, total,setOrderIdInContext,navigate) => {

  try {
    // console.log("userId",userId);
    if(!userId){
        alert("log in to order")
    }
    if (cartItems.length === 0) {
      alert("Cart is empty");     
      navigate("/");
      return;
    }
    // console.log('Cart Items:', cartItems);
    const response = await axios.post(`http://localhost:3000/api/orders/create-order/${userId}`, { total: total });
    // console.log("Order created successfully:",response.data.order.id);
    // Iterating through each cart item
    setOrderIdInContext(response.data.order.id);
    cartItems.map(async (el) => {
      if (el.quantity === undefined) {
        console.error(`Missing quantity for product ${el.id}`);
        return; // Skip this iteration if quantity is missing
      }
      
      
      await axios.post("http://localhost:3000/api/insert-into-order-product", {
        productId: el.id,
        quantity: el.quantity,  // Access quantity directly from 'el'
        OrderId: response.data.order.id
      }
    );
    navigate("/payment");
    //   console.log("Product added to order:", el.id);
    alert("product added to order")
    }
);
  } catch (err) {
    console.error("Error creating order:", err);
    throw new Error("Failed to create order");
  }
}
export default createOrder