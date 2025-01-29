const express = require("express");
const { getAllCategories, addCategory } = require("../controller/category");

const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.post("/", addCategory);

module.exports = categoryRouter;