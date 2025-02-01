// import express (after npm install express)
const express = require('express');
const orderProductRouter = require("../routes/orderProducts.js")
const orderRouter = require("../routes/orderRouter.js");
const paymentRoutes = require('../routes/payment.js');
const contactRoutes = require("../routes/contact.js")

const PORT = 3000;
// const helmet = require('helmet')
const app = express();
// const sequelize = require('./config/database')
const cors=require("cors")
// const authRoutes = require('./routes/authRoutes');
require('dotenv').config()
// app.use(helmet())

const database=require("../database/connection")
const userroutes=require("../routes/user.js")
const productRoutes=require("../routes/product.js")
const categoryRoutes = require("../routes/category");


app.use(express.json());
app.use(cors())
// server configuration

app.use("/api/orders",orderRouter)
app.use("/api/",orderProductRouter)
app.use("/api/user/",userroutes)
app.use("/api/product/",productRoutes)
app.use("/api/category/", categoryRoutes);
app.use('/api/payment', paymentRoutes);
app.use("/api/contact", contactRoutes);
// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});

module.exports=app
