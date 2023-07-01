const express = require("express");
const CommentController = require("../controllers/commentController");
const commentRouter = express.Router();

commentRouter.get("/:id", CommentController.getComments);
commentRouter.post("/", CommentController.addComment);
commentRouter.delete("/:id", CommentController.deleteComment);

module.exports = commentRouter;
