const User = require('../models/User');

class UserRepository {
    async findByUsername(username) {
        return User.findOne({ username });
    }

    async create(userData) {
        const user = new User(userData);
        return user.save();
    }
}

module.exports = UserRepository;
