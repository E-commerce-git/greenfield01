// import express (after npm install express)
const express = require('express');
const orderProductRouter = require("../routes/orderProducts.js")

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

app.use(express.json());
app.use(cors())
// server configuration

app.use("/api/",orderProductRouter)
app.use("/api/user/",userroutes)

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});

module.exports=app








