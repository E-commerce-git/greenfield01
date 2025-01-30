const { Category } = require("../database/connection");

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
};