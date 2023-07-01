const jwt = require("jsonwebtoken");
const Helpers = require("../utilities/Helpers");
const UserRepository = require("../db/repositories/userRepository");

class UserController {
  static async loginUser(req, res) {
    const { username, password } = req.body;
    try {
      const user = await Helpers.checkLoginData(username, password);
      const token = Helpers.createToken(user._id);
      const responseData = Helpers.getUserDataForResponse(user);
      res.status(200).json({ data: responseData, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async registerUser(req, res) {
    const { username, email, password } = req.body;

    try {
      const user = await Helpers.checkRegisterData(username, email, password);

      const token = Helpers.createToken(user._id);
      const responseData = Helpers.getUserDataForResponse(user);

      res.status(200).json({ data: responseData, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getCurrentUser(req, res) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ error: "Authorization required" });
    }
    const token = authorization.split(" ")[1];
    try {
      const { _id } = jwt.decode(token);
      const { username, email } = await UserRepository.getUserById(_id);
      res.status(200).json({ username, email });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = UserController;
