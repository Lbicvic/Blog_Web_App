const express = require("express");
const PostController = require("../controllers/postController");
const postRouter = express.Router();

postRouter.get("/", PostController.getPosts);
postRouter.get("/:id", PostController.getPostById);
postRouter.post("/", PostController.addPost);
postRouter.delete("/:id", PostController.deletePost);
postRouter.patch("/:id", PostController.updatePost);

module.exports = postRouter;
