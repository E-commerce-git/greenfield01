const db = require("../database/connection.js");
const Order = db.Order;

const handleTotal = async (ProductId,quantity,OrderId,oldQuantity,t) =>{
    const fixedOldQuantity = oldQuantity|| 0
  try {
    // ------------------ finding the oldTotal ----------------
    const order = await Order.findOne({ where: { OrderId:OrderId ,ProductId: ProductId},t });
    if (!order) {
      throw new Error("Order not found");
    } 
    // ------------------- finding the product ----------------
    const product = await db.Product.findByPk(ProductId,{t});
    if (!product) {
      throw new Error("Product not found");
    }

    //---------------------getting the price --------------------
    const price = product.price;
    // ------------------ calculating the new total ----------------
    const newTotal = order.total - (fixedOldQuantity * price) + (quantity * price);
    // ------------------ updating the total in the order ----------------
    await Order.update({ total: newTotal }, { where: { id: OrderId } ,t});
    // ------------------ returning the new total ----------------
    return newTotal;
  } catch (err) {
    console.error(err);
    throw err; 
  }
};

const createOrder = async(req,res)=>{
    const id = req.params.id;
    const {total} = req.body;
    if(!id){
      return res.status(400).json({ error: "No user ID provided" });
    }
    try{
      const newOrder = await Order.create({UserId: id,total:total});
      res.status(201).json({ message: "Order created successfully", order: newOrder });

    }catch (err){
      console.error("Error creating order:", err);
      return res.status(500).json({ error: "Failed to create order" });
    }
}
module.exports = {handleTotal,createOrder}