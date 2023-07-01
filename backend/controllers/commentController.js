const CommentRepository = require("../db/repositories/commentRepository");
const mongoose = require("mongoose");

class CommentController {
  static async getCommentsByPostId(req, res) {
    const { id } = req.params;
    try {
      const { comments } =
        await CommentRepository.getCommentsByPostId(id);
      res.status(200).json(comments);
    } catch (error) {
      res.status(404).json({ error: "Comments not found" });
    }
  }

  static async addComment(req, res) {
    const data = req.body;
    try {
      const comment = await CommentRepository.save(data);
      res.status(200).json(comment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteComment(req, res) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "Comment not found" });
    }
    try {
      const comment = await CommentRepository.deleteComment(id);
      res.status(200).json(comment);
    } catch (error) {
        res.status(404).json({ error: "Comment not found" });
    }
  }
}

module.exports = CommentController;