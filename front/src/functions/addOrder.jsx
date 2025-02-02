import { makeRequest, apis } from '../../stockApi/apistock';

const createOrder = async (userId, cartItems, total, setOrderIdInContext, navigate) => {
  try {
    if (!userId) {
      throw new Error("Please log in to place an order");
    }

    if (cartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    // Create the order
    const orderResponse = await makeRequest(() => apis.orders.create(userId), { total });
    const orderId = orderResponse?.data?.order?.id;

    if (!orderId) {
      throw new Error("Failed to create order");
    }

    setOrderIdInContext(orderId);

    // Add products to order
    await Promise.all(cartItems.map(async (item) => {
      if (!item.quantity) {
        throw new Error(`Missing quantity for product ${item.id}`);
      }

      await makeRequest(apis.orders.addProducts, {
        productId: item.id,
        quantity: item.quantity,
        OrderId: orderId
      });
    }));

    navigate("/payment");
    return true;

  } catch (error) {
    console.error("Error creating order:", error);
    alert(error.message || "Failed to create order");
    return false;
  }
};

export default createOrder;