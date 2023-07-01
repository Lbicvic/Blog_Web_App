const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const UserRepository = require("../db/repositories/userRepository");

class Helpers {
  static createToken(_id) {
    return jwt.sign({ _id }, process.env.SECRET_TOKEN_STRING, {
      expiresIn: "1d",
    });
  }

  static getUserDataForResponse(user) {
    const { _id, username, email } = user;
    return { _id, username, email };
  }

  static async checkLoginData(username, password) {
    if (!username || !password) {
      throw Error("Please fill all fields to continue");
    }

    const user = await UserRepository.getUserByUsername(username);

    if (!user) {
      throw Error("User does not exist");
    }

    const comparedPassword = await bcrypt.compare(password, user.password);

    if (!comparedPassword) {
      throw Error("Invalid password");
    }

    return user;
  }

  static async checkRegisterData(username, email, password) {
    if (!username || !email || !password) {
      throw Error("Please fill all fields to continue");
    }

    if (!validator.isEmail(email)) {
      throw Error("Email is not valid");
    }

    if (!validator.isStrongPassword(password)) {
      throw Error("Password not strong enough");
    }

    const userExists = await UserRepository.getUserByEmail(email);

    if (userExists) {
      throw Error("Email already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await this.create({
      username,
      email,
      password: hashPassword,
    });

    return user;
  }
}

module.exports = Helpers;
