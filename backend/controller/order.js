const db = require("../database/connection.js");
const Order = db.Order;

const handleTotal = async (ProductId,quantity,OrderId,oldQuantity,transaction) =>{
    const fixedOldQuantity = oldQuantity|| 0
  try {
    // ------------------ finding the oldTotal ----------------
    const order = await Order.findOne({ where: { OrderId:OrderId ,ProductId: ProductId},transaction });
    // ------------------- finding the product ----------------
    const product = await db.Product.findByPk(ProductId,{transaction});
    //---------------------getting the price --------------------
    const price = product.price;
    // ------------------ calculating the new total ----------------
    const newTotal = order.total - (fixedOldQuantity * price) + (quantity * price);
    // ------------------ updating the total in the order ----------------
    await Order.update({ total: newTotal }, { where: { id: OrderId } ,transaction});
    // ------------------ returning the new total ----------------
    return newTotal;
  } catch (err) {
    console.error(err);
  }
};
module.exports = {handleTotal}