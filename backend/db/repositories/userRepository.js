const User = require("../../models/userModel");

class UserRepository {
  static async getUserByEmail(email) {
    return await User.findOne({ email });
  }

  static async getUserById(id) {
    return await User.findOne({ _id: id });
  }
}

module.exports = UserRepository;
