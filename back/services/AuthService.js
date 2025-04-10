// Importa a interface para garantir que a classe siga a estrutura esperada
const IAuthService = require("./IAuthService");

// Importa bcrypt para criptografar senhas
const bcrypt = require("bcryptjs");

// Importa jwt para gerar tokens de autenticação
const jwt = require("jsonwebtoken");

class AuthService extends IAuthService {
  // O construtor recebe um repositório de usuários como dependência,
  // garantindo a inversão de dependência e facilitando testes
  constructor(userRepository) {
    super(); // Chama o construtor da interface (não obrigatório aqui)
    this.userRepository = userRepository; // Armazena o repositório para uso interno
  }

  // Registra um novo usuário no sistema
  async register(user) {
    // Verifica se o usuário já existe no banco de dados
    const existingUser = await this.userRepository.findByUsername(user.username);
    if (existingUser) throw new Error("Usuário já cadastrado!");

    // Criptografa a senha antes de armazená-la
    user.password = await bcrypt.hash(user.password, 10);

    // Cria o usuário no banco de dados
    await this.userRepository.create(user);

    return { message: "Usuário criado com sucesso!" };
  }

  // Autentica um usuário e retorna um token JWT se as credenciais forem válidas
  async login(username, password) {
    // Busca o usuário pelo nome de usuário
    const user = await this.userRepository.findByUsername(username);
    if (!user) throw new Error("Usuário não encontrado!");

    // Compara a senha fornecida com a senha armazenada no banco de dados
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Senha incorreta!");

    // Gera um token JWT para o usuário autenticado
    const token = jwt.sign({ id: user._id }, "secreto", { expiresIn: "1h" });

    return { message: "Logado com sucesso!", token };
  }
}

// Exporta a classe para que possa ser usada em outras partes do código
module.exports = AuthService;
