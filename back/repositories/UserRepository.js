const User = require("../models/User");
const IUserRepository = require("./IUserRepository");

class UserRepository extends IUserRepository {
  async create(user) {
    return await User.create(user);
  }

  async findByUsername(username) {
    return await User.findOne({ username });
  }
}

module.exports = UserRepository;
