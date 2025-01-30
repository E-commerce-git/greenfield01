const { Sequelize,DataTypes } = require('sequelize');

const config = require('./config')

const connection = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
        host: config.development.host,
        dialect: config.development.dialect
    }
);

connection.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


    db={}
db.Sequelize=Sequelize
db.connection=connection

db.User=require("./model/user")(connection, DataTypes)
db.Product=require("./model/product")(connection, DataTypes)
db.Order=require("./model/order")(connection, DataTypes)
db.Category=require("./model/category")(connection, DataTypes)
db.Payment=require("./model/payment.js")(connection, DataTypes)
db.OrderProduct = require("./model/order_product")(connection, DataTypes)

db.Category.hasMany(db.Product);
db.Product.belongsTo(db.Category);

db.Order.hasOne(db.Payment, { foreignKey: 'orderId', onDelete: 'CASCADE' });
db.Payment.belongsTo(db.Order, { foreignKey: 'orderId' });
db.User.hasMany(db.Order);
db.Order.belongsTo(db.User);

db.User.hasMany(db.Product)
db.Product.belongsTo(db.User)

db.Order.belongsToMany(db.Product,{ through: db.OrderProduct })
db.Product.belongsToMany(db.Order,{ through: db.OrderProduct })

connection.sync({force : true})


module.exports=db
