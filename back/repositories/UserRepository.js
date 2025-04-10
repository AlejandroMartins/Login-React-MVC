// Importa a interface do repositório de usuário para garantir que a classe siga seu contrato
const IUserRepository = require("./IUserRepository");

// Importa o modelo de usuário para interagir com o banco de dados
const User = require("../models/User");

class UserRepository extends IUserRepository {
  // O construtor chama o construtor da interface
  constructor() {
    super(); // Chamando o construtor da interface (embora não seja necessário em JS)
  }

  // Método para buscar um usuário pelo nome de usuário
  async findByUsername(username) {
    return User.findOne({ username }); // Retorna o primeiro usuário encontrado com o nome especificado
  }

  // Método para criar um novo usuário no banco de dados
  async create(userData) {
    const user = new User(userData); // Cria uma nova instância do modelo User com os dados recebidos
    return user.save(); // Salva o usuário no banco de dados e retorna a promessa do resultado
  }
}

// Exporta a classe para ser utilizada em outras partes do código
module.exports = UserRepository;
