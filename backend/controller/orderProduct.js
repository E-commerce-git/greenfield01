const db = require("../database/connection.js");
const orderProduct = db.OrderProduct;

//--------------------Helper Functions--------------------
const verifyData = (productId, quantity, OrderId) => {
  if (!productId || !quantity || !OrderId) {
    throw new Error("Invalid request body or params");
  }
  if (isNaN(quantity) || quantity <= 0) {
    throw new Error("Invalid quantity");
  }
};
const getOne = async (OrderId, productId) => {
  try {
    const cart = await orderProduct.findOne({
      where: { OrderId: OrderId, productId: productId },
    });
    return cart;
  } catch (err) {
    console.error("Error finding cart:", err);
    throw new Error("Failed finding cart");
  }
};
//--------------------------------------------------------

const addToCart = async (req, res) => {
  let { productId, quantity, OrderId } = req.body;
  quantity = quantity || 1;
  try {
    verifyData(productId, quantity, OrderId);
    const product = await db.Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    } // check if product is existing product
    const cart = await getOne(OrderId, productId);
    
    // look if our cart exist or no
    if (!cart) {
      const newCartItem = await orderProduct.create({
        OrderId: OrderId,
        ProductId: productId,
        quantity: quantity,
      });
      return res
        .status(201)
        .json({ message: "added to cart successfully", data: newCartItem }); //if it dont exist we create it
    } else {
      let newCartQuantity = cart.quantity + quantity;
      await orderProduct.update(
        { quantity: newCartQuantity },
        { where: { OrderId: OrderId, productId: productId } }
      );

      const updatedQuantity = await getOne(OrderId, productId);
      return res
        .status(200)
        .json({ message: "added to cart successfully", data: updatedQuantity });
    }
  } catch (err) {
    console.error("Error adding to cart:", err);
    return res.status(500).json({ error: "Failed to add to cart" });
  }
};

const updateCart = async (req, res) => {
  const { productId, quantity, OrderId } = req.body;
  verifyData(productId, quantity, OrderId);
  try {
    const cart = await getOne(OrderId, productId);
    if (!cart) {
      return res.status(404).json({ error: "Product not found in the cart" });
    }
    await orderProduct.update(
      { quantity: quantity },
      { where: { OrderId: OrderId, productId: productId } }
    );

    const updatedQuantity = await getOne(OrderId, productId);
    return res
      .status(200)
      .json({ message: "cart updated successfully", data: updatedQuantity });
  } catch (err) {
    console.error("Error updating cart:", err);
    return res.status(500).json({ error: "Failed to update cart" });
  }
};

const removeFromCart = async (req, res) => {
  const { OrderId, productId } = req.params;
  try {
    const cart = await getOne(OrderId, productId);
    if (!cart) {
      return res.status(404).json({ error: "Product not found in the cart" });
    }
    await orderProduct.destroy({
      where: { OrderId: OrderId, productId: productId },
    });
    return res
      .status(200)
      .json({ message: "Product removed from cart successfully" });
  } catch (err) {
    console.error("Error removing from cart:", err);
    return res.status(500).json({ error: "Failed to remove from cart" });
  }
};

module.exports = { addToCart, removeFromCart, updateCart };
