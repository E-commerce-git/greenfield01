
module.exports = (connection, DataTypes) => {
    const OrderProduct = connection.define('OrderProduct', {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    });
  
    return OrderProduct;
  };
  