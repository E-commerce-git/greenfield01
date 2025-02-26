const db = require("../database/connection.js");
const orderProduct = db.OrderProduct;
const connection = db.connection
const {handleTotal} = require("./order.js")

//--------------------Helper Functions--------------------
const verifyData = (productId, quantity, OrderId) => {

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

};


const insertIntoOrderProduct = async (req, res) => {
  const { productId, quantity, OrderId } = req.body;
  verifyData(productId, quantity, OrderId);
  try{
    const addedProduct = await orderProduct.create({ProductId:   productId, quantity:quantity,OrderId: OrderId} )
    return res.status(201).json({message:"product ordered successfully",data:addedProduct})
  }catch(err){
    console.error("Error inserting into orderProduct:", err);
    throw new Error("Failed inserting into orderProduct");
  }
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------
const updateCart = async (req, res) => {
  const { productId, quantity, OrderId } = req.body;
  verifyData(productId, quantity, OrderId);
  //--------------Start the transaction----------------------
const t = await connection.transaction(); 
//---------------------------------------------------------
  try {
    const cart = await getOne(OrderId, productId);
    if (!cart) {
      return res.status(404).json({ error: "Product not found in the cart" });
    }
    await orderProduct.update(
      { quantity: quantity },
      { where: { OrderId: OrderId, productId: productId } },{ transaction: t }
    );
//---------------------updateTheTotal()------------------------
    await handleTotal(productId,quantity,OrderId,cart.quantity,t)
//-------------------------------------------------------------
//----------------------getting the updated product------------
    const updatedQuantity = await getOne(OrderId, productId);
//-------------------------------------------------------------
    await t.commit();
    return res
      .status(200)
      .json({ message: "cart updated successfully", data: updatedQuantity });
  } catch (err) {
      console.error("Error updating cart:", err);
      await t.rollback();
    return res.status(500).json({ error: "Failed to update cart" });
  }
};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const removeFromCart = async (req, res) => {
  const { OrderId, productId } = req.params;
//--------------Start the transaction----------------------
const t = await connection.transaction(); 
//---------------------------------------------------------
  try {
    const cart = await getOne(OrderId, productId);
    if (!cart) {
      return res.status(404).json({ error: "Product not found in the cart" });
    }
    await orderProduct.destroy({
      where: { OrderId: OrderId, productId: productId },
    },{ transaction: t });
//---------------------updateTheTotal()------------------------
await handleTotal(productId,0,OrderId,cart.quantity,t)
//-------------------------------------------------------------
    await t.commit();
    return res
      .status(200)
      .json({ message: "Product removed from cart successfully" });
  } catch (err) {
    console.error("Error removing from cart:", err);
    await t.rollback();
    return res.status(500).json({ error: "Failed to remove from cart" });
  }
};

const getAllProductOrders = async (req, res) => {
  try {
    const allProductOrders = await orderProduct.findAll();
    return res.status(200).json({ message: "All product orders retrieved", data: allProductOrders });
  } catch (err) {
    console.error("Error retrieving product orders:", err);
    return res.status(500).json({ error: "Failed to retrieve product orders" });
  }
};


module.exports = { addToCart,insertIntoOrderProduct, removeFromCart, updateCart,getAllProductOrders };
