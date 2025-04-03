const IAuthService = require("./IAuthService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthService extends IAuthService {
  constructor(userRepository) {
    super(); // Chamando o construtor da interface
    this.userRepository = userRepository;
  }

  async register(user) {
    const existingUser = await this.userRepository.findByUsername(user.username);
    if (existingUser) throw new Error("Usuário já cadastrado!");

    user.password = await bcrypt.hash(user.password, 10);
    await this.userRepository.create(user);
    return { message: "Usuário criado com sucesso!" };
  }

  async login(username, password) {
    const user = await this.userRepository.findByUsername(username);
    if (!user) throw new Error("Usuário não encontrado!");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Senha incorreta!");

    const token = jwt.sign({ id: user._id }, "secreto", { expiresIn: "1h" });
    return { message: "Logado com sucesso!", token };
  }
}

module.exports = AuthService;
