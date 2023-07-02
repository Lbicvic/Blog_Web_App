const CommentRepository = require("../db/repositories/commentRepository");
const PostRepository = require("../db/repositories/postRepository");
const mongoose = require("mongoose");

class PostController {
  static async getPosts(req, res) {
    try {
      const { posts } = await PostRepository.getPosts();
      res.status(200).json(posts);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async addPost(req, res) {
    const postData = req.body;
    try {
      const post = await PostRepository.save(postData);
      res.status(200).json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getPostById(req, res) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Post not found" });
    }
    try {
      const post = await PostRepository.getPostById(id);
      res.status(200).json(post);
    } catch (error) {
      res.status(404).json({ error: "Post not found" });
    }
  }

  static async updatePost(req, res) {
    const { id } = req.params;
    const data = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Post not found" });
    }
    try {
      const post = await PostRepository.updatePost(data, id);
      res.status(200).json(post);
    } catch (error) {
      res.status(404).json({ error: "Post not found" });
    }
  }

  static async deletePost(req, res) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Post not found" });
    }
    try {
      const { comments } = await CommentRepository.getCommentsByPostId(id);
      comments.map(async (comment) => {
        await CommentRepository.deleteComment(comment._id);
      });
      const post = await PostRepository.deletePost(id);
      res.status(200).json(post);
    } catch (error) {
      res.status(404).json({ error: "Post not found" });
    }
  }
}

module.exports = PostController;
