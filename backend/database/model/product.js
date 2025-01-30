module.exports = (connection, DataTypes) => {
    const Product = connection.define(
      "Product",
     { name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    

    description: {
        type: DataTypes.STRING,
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,

},
imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
},
size: {
    type: DataTypes.ENUM("XS", "S", "M", "L", "XL", "XXL"),
    allowNull: false, 
},

}
   
    )
    return Product;
  };
  