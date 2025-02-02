const { User } = require("../database/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
console.log("proccess",process.env.JWT_SECRET)
module.exports = {

  register: async (req, res) => {

    
    const { userName, email, password, role } = req.body;
    try {
      const allowedRoles = ['user', 'seller'];
      if (!allowedRoles.includes(role)) {
        return res.status(400).json({ 
          message: "Invalid role. Must be either 'user' or 'seller'" 
        });
      }  

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        userName,
        email,
        password: hashedPassword,
        role
      });

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
      );

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
    const { email, password, role } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      if (user.role !== role) {
        return res.status(403).json({ 
          message: `Access denied. You are not registered as a ${role}` 
        });
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

      res.json({ 
        message: "Login successful",
        token,
        user: {
          id: user.id,
          userName: user.userName,
          email: user.email,
          role: user.role
        }
      });

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

  updateUser: async (req, res) => {
    try {
 
      const userId = req.user.id;
      const { userName, email, currentPassword, newPassword } = req.body;


      const user = await User.findOne({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }


      const updateData = {
        userName: userName || user.userName,
        email: email || user.email,
      };

      if (currentPassword && newPassword) {

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
          return res.status(400).json({ message: "Current password is incorrect" });
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        updateData.password = hashedPassword;
      }


      await User.update(updateData, {
        where: { id: userId }
      });

      const updatedUser = await User.findOne({ 
        where: { id: userId },
        attributes: ['id', 'userName', 'email', 'role'] 
      });

      res.status(200).json({ 
        message: "Profile updated successfully", 
        user: updatedUser 
      });

    } catch (error) {
      console.error("Error updating user:", error);
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
      const user = await User.findOne({ where: { id: req.user.id } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching current user:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findOne({ where: { id } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  checkAuth: async (req, res) => {
    try {
      if (req.user) {
        const user = await User.findOne({ 
          where: { id: req.user.id },
          attributes: ['id', 'userName', 'email', 'role'] 
        });

        if (!user) {
          return res.status(401).json({
            isAuthenticated: false,
            user: null
          });
        }

        return res.status(200).json({
          isAuthenticated: true,
          user: user
        });
      }

      return res.status(401).json({
        isAuthenticated: false,
        user: null
      });
    } catch (error) {
      console.error("Error checking auth:", error);
      return res.status(500).json({
        isAuthenticated: false,
        user: null,
        message: "Server error"
      });
    }
  },


  registerAdmin: async (req, res) => {
    const { userName, email, password, role } = req.body;
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const user = await User.create({
        userName,
        email,
        password: hashedPassword,
        role, 
      });
  
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
      );
  
      res.status(201).json({
        message: "User created successfully",
        token,
      });
  
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }
  ,

  LoginAdmin: async (req, res) => {
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

  updateUserfromAdmin: async (req, res) => {
    try {
      const { id } = req.params;
      const { userName, email, password, role } = req.body;
  
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      let updatedFields = { userName, email, role };
  
      if (password) {
        const salt = await bcrypt.genSalt(10);
        updatedFields.password = await bcrypt.hash(password, salt);
      }
  
      await User.update(updatedFields, { where: { id } });
  
      const updatedUser = await User.findByPk(id, { attributes: ["id", "userName", "email", "role"] });
  
      res.status(200).json({ message: "User updated successfully", updatedUser });
  
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
  
}  

