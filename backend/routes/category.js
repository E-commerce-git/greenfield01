const express = require("express");
const { 
  getAllCategories, 
  addCategory, 
  getProductsByCategory,
  updateCategory,
  deleteCategory,
  getCategoryById
} = require("../controller/category");

const categoryRouter = express.Router();

// Get all categories
categoryRouter.get("/categories", getAllCategories);

// Get single category
categoryRouter.get("/category/:id", getCategoryById);

// Add new category
categoryRouter.post("/add", addCategory);

// Update category
categoryRouter.put("/update/:id", updateCategory);

// Delete category
categoryRouter.delete("/delete/:id", deleteCategory);

// Get products by category
categoryRouter.get("/:categoryId/products", getProductsByCategory);

module.exports = categoryRouter;