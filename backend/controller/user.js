const { User } = require("../database/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    const { userName, email, password, role } = req.body;

    try {
      // Validate role
 

      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user with specified role
      const user = await User.create({
        userName,
        email,
        password: hashedPassword,
        role // Include role in user creation
      });

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
      );

      // Return success with token and user data
      res.status(201).json({ 
        message: "User created successfully", 
        token,
        user: {
          id: user.id,
          userName: user.userName,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Server error" });
    }
  },


  login: async (req, res) => {
    const { email, password } = req.body;

    try {

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
      );

      res.json({ message: "Login successful", token, user });

    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      await User.destroy({ where: { id } });
      res.status(200).send("deleted")
    } catch (error) {
      console.error("user deleted", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  updateUser: async (req,res) => {
    try {
      const { id } = req.params;
      const {userName,email,password,role}=req.body
      await User.update({userName,email,password,role},{
        where : {id}
      })
      res.status(200).send("updated")
    } catch (error) {
      console.error("user updated", error);
      res.status(500).json({ message: "Server error" });
    }
    
  },
  getAllUser : async (req,res) => {
    try {
      const users = await User.findAll()
      res.status(200).send(users)
    } catch (error) {
      console.error("users not found", error);
     
    }
    
  },
  currentUser: async (req, res) => {
    try {
      console.log("het l user", req.user); // Debugging line
      const user = await User.findOne({ where: { id: req.user.id } }); // Extract ID
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching current user:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  

};

