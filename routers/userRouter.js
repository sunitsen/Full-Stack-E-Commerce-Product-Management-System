const express = require("express");
const { register, login } = require("../controllers/user.controller");

const userRouter = express.Router();

// Route to register a new user
userRouter.post("/user/register", register);

// Route to log in an existing user
userRouter.post("/user/login", login);

module.exports = userRouter;
