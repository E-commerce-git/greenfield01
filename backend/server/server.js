// import express (after npm install express)
const express = require('express');
const PORT = 3000;
const helmet = require('helmet')
const app = express();
const sequelize = require('./config/database')
const cors=require("cors")
const authRoutes = require('./routes/authRoutes');
require('dotenv').config()
app.use(helmet())

const database=require("../database/connection")

app.use(express.json());
app.use(cors())


app.use('/api/auth', authRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});

module.exports=app








