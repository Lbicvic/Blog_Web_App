const express = require("express");
const UserController = require("../controllers/userController");
const AuthMiddleware = require("../middleware/authMiddleware");
const userRouter = express.Router();

userRouter.post("/login", UserController.loginUser);

userRouter.post("/register", UserController.registerUser);

userRouter.get("/getUser", UserController.getCurrentUser, AuthMiddleware.requireAuth);

module.exports = userRouter;