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
            const userId = req.user.id;

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
    },

    deleteProduct: async (req, res) => {
        try {
            const productId = req.params.id;
            const userId = req.user.id;

            // Find the product
            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            // Check if the user is the owner of the product or an admin
            if (product.UserId !== userId && req.user.role !== 'admin') {
                return res.status(403).json({ message: "Unauthorized to delete this product" });
            }

            await product.destroy();
            res.json({ message: "Product deleted successfully" });
        } catch (error) {
            console.error("Error deleting product:", error);
            res.status(500).json({ message: "Server error" });
        }
    },

    updateProduct: async (req, res) => {
        try {
            const productId = req.params.id;
            const userId = req.user.id;
            const updates = req.body;

            // Find the product
            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            // Check if the user is the owner of the product or an admin
            if (product.UserId !== userId && req.user.role !== 'admin') {
                return res.status(403).json({ message: "Unauthorized to update this product" });
            }

            await product.update(updates);
            res.json({ message: "Product updated successfully", product });
        } catch (error) {
            console.error("Error updating product:", error);
            res.status(500).json({ message: "Server error" });
        }
    },

    // searchProducts: async (req, res) => {
    //     try {
    //         const { query } = req.query;
            
    //         const products = await Product.findAll({
    //             where: {
    //                 name: {
    //                     [connection.Sequelize.Op.iLike]: `%${query}%`  // Case-insensitive search
    //                 }
    //             },
    //             include: [{ model: User, attributes: ["userName", "email"] }, { model: Category }]
    //         });
            
    //         res.json({ products });
    //     } catch (error) {
    //         console.error("Error searching products:", error);
    //         res.status(500).json({ message: "Server error" });
    //     }
    // }
};
