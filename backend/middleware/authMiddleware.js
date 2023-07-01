const jwt = require("jsonwebtoken");
const UserRepository = require("../db/repositories/userRepository");

class AuthMiddleware {
  static async requireAuth(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ error: "Authorization required" });
    }
    const token = authorization.split(" ")[1];
    try {
      const { _id } = jwt.verify(token, process.env.SECRET_TOKEN_STRING);
      const user = await UserRepository.getUserById(_id);
      if(!user){
      return res.status(401).json({ error: "Authorization required, user does not exist" });
      }
      next();
    } catch (error) {
      res.status(401).json({ error: "Request is not authorized" });
    }
  }
}

module.exports = AuthMiddleware;