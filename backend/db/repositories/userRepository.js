const User = require("../../models/userModel");

class UserRepository {
  static async save(user) {
    try {
      return await User.create(user);
    } catch (error) {
      return { error: error.message };
    }
  }
  static async getUserByEmail(email) {
    return await User.findOne({ email });
  }

  static async getUserById(id) {
    return await User.findOne({ _id: id });
  }

  static async getUserByUsername(username) {
    return await User.findOne({ username });
  }
}

module.exports = UserRepository;
