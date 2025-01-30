const { Category, Product, User } = require("../database/connection");

module.exports = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.findAll();
      res.json({ categories });
    } catch (error) {
      console.error("Error getting categories:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  getProductsByCategory: async (req, res) => {
    try {
      const { categoryId } = req.params;
      const products = await Product.findAll({
        where: { CategoryId: categoryId },
        include: [
          { model: User, attributes: ["userName", "email"] },
          { model: Category }
        ]
      });
      res.json({ products });
    } catch (error) {
      console.error("Error getting products by category:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  addCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await Category.create({ name });
      res.status(201).json({ message: "Category added successfully", category });
    } catch (error) {
      console.error("Error adding category:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      // Find the category
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      // Update the category
      await category.update({ name });
      
      res.json({ 
        message: "Category updated successfully", 
        category 
      });
    } catch (error) {
      console.error("Error updating category:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;

      // Find the category
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      // Check if category has associated products
      const productsCount = await Product.count({
        where: { CategoryId: id }
      });

      if (productsCount > 0) {
        return res.status(400).json({ 
          message: "Cannot delete category with associated products. Please remove or reassign products first." 
        });
      }

      // Delete the category
      await category.destroy();
      
      res.json({ message: "Category deleted successfully" });
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  // Optional: Get a single category by ID
  getCategoryById: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.json({ category });
    } catch (error) {
      console.error("Error getting category:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
};