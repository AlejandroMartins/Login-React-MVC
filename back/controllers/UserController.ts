// Importa os tipos do Express para garantir tipagem correta nas requisições e respostas
import { Request, Response } from "express";

// Importa a interface de serviço de autenticação, garantindo que o controller dependa apenas da abstração
import { IAuthService } from "../services/IAuthService";

// Define a classe UserController, responsável por lidar com requisições HTTP relacionadas a usuários
export class UserController {
  // Atributo privado que representa o serviço de autenticação
  private authService: IAuthService;

  // Injeção de dependência via construtor — facilita testes e desacoplamento
  constructor(authService: IAuthService) {
    this.authService = authService;
  }

  // Método para lidar com o cadastro de novos usuários
  register = async (req: Request, res: Response): Promise<void> => {
    try {
      // Chama o método register do serviço de autenticação, passando os dados do corpo da requisição
      const result = await this.authService.register(req.body);

      // Retorna resposta com status 201 (Created) e a mensagem de sucesso
      res.status(201).json(result);
    } catch (error: any) {
      // Em caso de erro (ex: usuário já existente), retorna status 400 com a mensagem do erro
      res.status(400).json({ message: error.message });
    }
  };

  // Método para lidar com login de usuários
  login = async (req: Request, res: Response): Promise<void> => {
    try {
      // Desestrutura o corpo da requisição para obter username e password
      const { username, password } = req.body;

      // Chama o método login do AuthService com as credenciais fornecidas
      const result = await this.authService.login(username, password);

      // Retorna o token de autenticação gerado, junto com a mensagem
      res.json(result);
    } catch (error: any) {
      // Em caso de erro (ex: usuário não encontrado ou senha inválida), retorna status 400 com a mensagem
      res.status(400).json({ message: error.message });
    }
  };
}
