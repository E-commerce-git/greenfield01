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
    const { total } = req.body;
    const userId = req.params.id;

    if (!userId || !total) {
        return res.status(400).json({ error: "User ID and total are required" });
    }

    try {
        const newOrder = await Order.create({
            UserId: userId,
            total,
            status: 'pending', // Default status
        });

        res.status(201).json({ message: "Order created successfully", order: newOrder });
    } catch (err) {
        console.error("Error creating order:", err);
        res.status(500).json({ error: "Failed to create order" });
    }
}
const getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.findAll();
    return res.status(200).json({ message: "All orders retrieved", data: allOrders });
  } catch (err) {
    console.error("Error retrieving orders:", err);
    return res.status(500).json({ error: "Failed to retrieve orders" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.update({ status });
    
    res.json({ 
      message: "Order status updated successfully", 
      order 
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Server error" });
  }
}

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    
    const order = await Order.findOne({
      where: { id },
      include: [{
        model: db.Product,
        through: {
          model: db.OrderProduct,
          attributes: ['quantity']
        },
        include: [{
          model: db.Category,
          attributes: ['name']
        }]
      }]
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      order,
      products: order.Products
    });
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {handleTotal,createOrder,getAllOrders,updateOrderStatus,getOrderDetails}