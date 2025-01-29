// import express (after npm install express)
const express = require('express');
const orderProductRouter = require("../routes/orderProducts.js")

const PORT = 3000;
const app = express();
const cors=require("cors")



const database=require("../database/connection")

app.use(express.json());
app.use(cors())
// server configuration

app.use("/api/",orderProductRouter)

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});

module.exports=app