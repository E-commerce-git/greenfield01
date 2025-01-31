module.exports = (connection, DataTypes) => {
 
    const Order = connection.define(
      "Order",
     { total: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
    },}
   
    )
    return Order;
  };
  