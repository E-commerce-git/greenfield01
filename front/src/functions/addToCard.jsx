import { makeRequest, apis } from '../../stockApi/apistock';

export const addToCart = async (productId, quantity = 1, userId) => {
  try {
    if (!userId) {
      throw new Error("Please log in to add items to cart");
    }

    const response = await makeRequest(apis.cart.addItem, {
      productId,
      quantity,
      userId
    });

    if (response?.data?.success) {
      return {
        success: true,
        message: "Product added to cart successfully"
      };
    } else {
      throw new Error("Failed to add product to cart");
    }

  } catch (error) {
    console.error("Error adding to cart:", error);
    return {
      success: false,
      message: error.message || "Failed to add product to cart"
    };
  }
};