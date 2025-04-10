class UserController {
  // O construtor recebe um serviço de autenticação como dependência,
  // garantindo a inversão de dependência e facilitando testes
  constructor(authService) {
    this.authService = authService; // Armazena o serviço de autenticação para uso interno
  }

  // Método para registrar um novo usuário
  register = async (req, res) => {
    try {
      // Chama o serviço de autenticação para registrar o usuário
      const result = await this.authService.register(req.body);
      
      // Retorna a resposta de sucesso com código 201 (Criado)
      res.status(201).json(result);
    } catch (error) {
      // Em caso de erro, retorna uma resposta com código 400 (Bad Request) e a mensagem de erro
      res.status(400).json({ message: error.message });
    }
  };

  // Método para realizar o login de um usuário
  login = async (req, res) => {
    try {
      // Chama o serviço de autenticação para validar as credenciais
      const result = await this.authService.login(req.body.username, req.body.password);
      
      // Retorna a resposta de sucesso com os dados do login (incluindo o token)
      res.json(result);
    } catch (error) {
      // Em caso de erro, retorna uma resposta com código 400 (Bad Request) e a mensagem de erro
      res.status(400).json({ message: error.message });
    }
  };
}

// Exporta a classe para ser usada em outras partes do código
module.exports = UserController;
