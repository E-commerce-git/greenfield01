const express = require('express');
const { login,register,getAllUser, deleteUser, updateUser,currentUser,getUserById, checkAuth } = require('../controller/user');
const authenticateJWT=require("../auth/auth")
const Router = express.Router()
Router.put('/current',authenticateJWT,updateUser)
Router.delete('/:id',deleteUser)
Router.get('/',getAllUser)
Router.get("/getUser", authenticateJWT, currentUser)
Router.post("/register",register)
Router.post("/login",login)
Router.get('/user/:id', getUserById);
Router.get('/check-auth', authenticateJWT, checkAuth);
module.exports = Router 