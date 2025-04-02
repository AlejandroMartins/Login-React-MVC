const User = require("../models/User");
const { IUserRepository } = require("./IUserRepository");

class UserRepository extends IUserRepository {
  async findByUsername(username) {
    return User.findOne({ username });
  }

  async create(userData) {
    const user = new User(userData);
    return user.save();
  }
}

module.exports = UserRepository;
