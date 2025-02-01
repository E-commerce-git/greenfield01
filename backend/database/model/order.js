module.exports = (connection, DataTypes) => {
  const Order = connection.define("Order", {
      total: {
          type: DataTypes.FLOAT,
          allowNull: false,
      },
      status: {
          type: DataTypes.STRING,
          defaultValue: 'pending',
      },
      paymentIntentId: {
          type: DataTypes.STRING,
          allowNull: true,
      },
  });
  return Order;
};