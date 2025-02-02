const express = require('express');
const { login,register,getAllUser, deleteUser, updateUser,currentUser,getUserById, checkAuth,registerAdmin,LoginAdmin,updateUserfromAdmin } = require('../controller/user');
const authenticateJWT=require("../auth/auth")
const Router = express.Router()
const dev = require("../database/config")

Router.put(dev.development.UPDATE_USER_ENDPOINT,authenticateJWT,updateUser)
Router.delete(dev.development.DELETE_USER_ENDPOINT,deleteUser)
Router.get(dev.development.GET_ALL_USERS_ENDPOINT,getAllUser)
Router.get(dev.development.CURRENT_USER_ENDPOINT, authenticateJWT, currentUser)
Router.post(dev.development.REGISTER_ENDPOINT,register)
Router.post(dev.development.LOGIN_ENDPOINT,login)
Router.get(dev.development.GET_USER_BY_ID_ENDPOINT, getUserById);
Router.get(dev.development.CHECK_AUTH_ENDPOINT, authenticateJWT, checkAuth);
Router.post(dev.development.REGISTER_ADMIN_ENDPOINT,registerAdmin)
Router.post(dev.development.LOGIN_ADMIN_ENDPOINT,LoginAdmin)
Router.put(dev.development.UPDATE_USER_FROM_ADMIN_ENDPOINT,updateUserfromAdmin)
module.exports = Router 