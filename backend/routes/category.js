const express = require("express");
const dev = require('../database/config.js');
const { 
  getAllCategories, 
  addCategory, 
  getProductsByCategory,
  updateCategory,
  deleteCategory,
  getCategoryById
} = require("../controller/category");

const categoryRouter = express.Router();


categoryRouter.get(dev.development.CATEGORY, getAllCategories);


categoryRouter.get(dev.development.GET_CATEGORY_BY_ID, getCategoryById);


categoryRouter.post(dev.development.ADD_CATEGORY, addCategory);


categoryRouter.put(dev.development.UPDATE_CATEGORY, updateCategory);


categoryRouter.delete(dev.development.DELETE_CATEGORY, deleteCategory);


categoryRouter.get(dev.development.GET_PRODUCTS_BY_CATEGORY, getProductsByCategory);

module.exports = categoryRouter;