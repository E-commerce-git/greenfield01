const express = require('express');
const orderProductRouter = require("../routes/orderProducts.js")
const orderRouter = require("../routes/orderRouter.js");
const paymentRoutes = require('../routes/payment.js');
const contactRoutes = require("../routes/contact.js")
const development = require("../database/config.js")

const PORT = development.development.PORT;

const app = express();

const cors=require("cors")

require('dotenv').config()


const database=require("../database/connection")
const userroutes=require("../routes/user.js")
const productRoutes=require("../routes/product.js")
const categoryRoutes = require("../routes/category");
const reviewRoutes = require("../routes/reviews.js");


app.use(express.json());
app.use(cors())


app.use(development.development.ORDERSROUTER, orderRouter);
app.use(development.development.ORDERPRODUCTROUTER, orderProductRouter);
app.use(development.development.USERROUTES, userroutes);
app.use(development.development.PRODUCTROUTES, productRoutes);
app.use(development.development.CATEGORYROUTES, categoryRoutes);
app.use(development.development.PAYMENTROUTES, paymentRoutes);
app.use(development.development.CONTACTROUTES, contactRoutes);
app.use(development.development.REVIEWROUTES, reviewRoutes);

app.listen(PORT, () => {
  console.log(`Server running at: ${development.development.Host}${PORT}/`);
});

module.exports=app
