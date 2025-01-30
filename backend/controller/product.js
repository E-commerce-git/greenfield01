const { Product, User, Category } = require("../database/connection");

module.exports = {
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.findAll({
                include: [{ model: User, attributes: ["userName", "email"] }, { model: Category }]
            });
            res.json({ products });
        } catch (error) {
            console.error("Error getting products:", error);
            res.status(500).json({ message: "Server error" });
        }
    },

    addProduct: async (req, res) => {
        try {
            const { name, price, description, stock, imageUrl, size, categoryId } = req.body;
            const userId = req.params.id;

            // Find the user
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            // Check if the user is a seller
            if (user.role !== "seller") {
                return res.status(403).json({ message: "Only sellers can add products" });
            }

            // Check if the category exists
            const category = await Category.findByPk(categoryId);
            if (!category) {
                return res.status(400).json({ message: "Invalid category" });
            }
            console.log(category,"categorycategorycategory");
            

            // Create the product
            const product = await Product.create({
                name,
                price,
                description,
                stock,
                imageUrl,
                size,
                CategoryId: categoryId, // Foreign key relation
                UserId: userId, // Associate product with the seller
            });

            res.status(201).json({ message: "Product added successfully", product });
        } catch (error) {
            console.error("Error adding product:", error);
            res.status(500).json({ message: "Server error" });
        }
    }
};
