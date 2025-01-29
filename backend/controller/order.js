const db = require("../database/connection.js");$
const Order = db.Order;

const handleTotal = async (productId,quantity,OrderId,oldQuantity) =>{
    const fixedOldQuantity = oldQuantity|| 0
  try {
    // ------------------ finding the oldTotal ----------------
    const order = await Order.findOne({ where: { OrderId:OrderId ,productId: productId} });
    const oldTotal = order.total;
    // ------------------- finding the product ----------------
    const product = await db.Product.findByPk(productId);
    //---------------------getting the price --------------------
    const price = product.price;
    // ------------------ calculating the new total ----------------
    const newTotal = oldTotal - (fixedOldQuantity * price) + (quantity * price);
    // ------------------ updating the total in the order ----------------
    await Order.update({ total: newTotal }, { where: { productId: productId } });
    // ------------------ returning the new total ----------------
    return;
  } catch (err) {
    console.error(err);
  }
};
