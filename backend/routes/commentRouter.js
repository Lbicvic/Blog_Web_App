const express = require("express");
const CommentController = require("../controllers/commentController");
const AuthMiddleware = require("../middleware/authMiddleware");
const commentRouter = express.Router();

commentRouter.use(AuthMiddleware.requireAuth);

commentRouter.get("/:id", CommentController.getCommentsByPostId);
commentRouter.post("/", CommentController.addComment);
commentRouter.delete("/:id", CommentController.deleteComment);

module.exports = commentRouter;
