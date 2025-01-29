module.exports = (connection, DataTypes) => {
    const Payment = connection.define('Payment', {
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      paymentDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'pending', // You can change this to reflect different statuses like 'pending', 'failed', etc.
      },
    });
  
    return Payment;
  };
  