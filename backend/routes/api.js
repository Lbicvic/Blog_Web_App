const express = require("express");
const postRouter = require("./postRouter");
const userRouter = require("./userRouter");
const commentRouter = require("./commentRouter");

const api = express.Router();

api.use("/user", userRouter);
api.use("/posts", postRouter);
api.use("/comments", commentRouter);

module.exports = api;