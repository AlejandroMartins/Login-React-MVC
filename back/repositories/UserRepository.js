const IUserRepository = require("./IUserRepository");
const User = require("../models/User");

class UserRepository extends IUserRepository {
  constructor() {
    super(); // Chamando o construtor da interface
  }

  async findByUsername(username) {
    return User.findOne({ username });
  }

  async create(userData) {
    const user = new User(userData);
    return user.save();
  }
}

module.exports = UserRepository;
