const Post = require("../../models/postModel");

class PostRepository {
  static async save(post) {
    try {
      return await Post.create(post);
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getPosts() {
    const posts = await Post.find({}).sort({ createdAt: -1 });

    return { posts: posts };
  }

  static async getPostById(postId) {
    try {
      return await Post.findById(postId);
    } catch (error) {
      return { error: error.message };
    }
  }

  static async updatePost(post, postId) {
    try {
      return await Post.findByIdAndUpdate(postId, post, { new: true });
    } catch (error) {
      return { error: error.message };
    }
  }

  static async deletePost(postId) {
    return await Post.findOneAndDelete({ _id: postId });
  }
}

module.exports = PostRepository;