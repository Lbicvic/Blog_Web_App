const Comment = require("../../models/commentModel");

class CommentRepository {
  static async save(comment) {
    try {
      return await Comment.create(comment);
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getCommentsByPostId(id) {
    const comments = await Application.find({ postId: id }).sort({
      createdAt: -1,
    });

    return { comments };
  }

  static async deleteComment(commentId) {
    return await Comment.findOneAndDelete({ _id: commentId });
  }
}

module.exports = CommentRepository;
