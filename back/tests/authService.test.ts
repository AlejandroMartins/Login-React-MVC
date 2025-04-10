// Importa o AuthService (versão em TypeScript com exportação nomeada)
import { AuthService } from "../services/AuthService";
import { IAuthService } from "../services/IAuthService";

// Importa as interfaces para tipagem
import { IUser } from "../models/User";
import IUserRepository from "../repositories/IUserRepository";

// Importa utilitários do Jest
import { jest } from "@jest/globals";

describe("AuthService", () => {
  let authService: IAuthService;
  let mockUserRepository: jest.Mocked<IUserRepository>;

  // Antes de cada teste, cria um mock do repositório de usuários
  beforeEach(() => {
    mockUserRepository = {
      findByUsername: jest.fn(),
      create: jest.fn(),
    };

    // Cria uma instância real do serviço com o mock injetado
    authService = new AuthService(mockUserRepository);
  });

  test("Deve registrar um novo usuário", async () => {
    // Simula que o usuário ainda não existe
    mockUserRepository.findByUsername.mockResolvedValue(null);

    // Simula que a criação foi feita com sucesso
    mockUserRepository.create.mockResolvedValue({ username: "testuser" } as any);

    const result = await authService.register({
      username: "testuser",
      password: "1234",
    } as IUser);

    // Espera a mensagem de sucesso
    expect(result).toEqual({ message: "Usuário criado com sucesso!" });
  });

  test("Deve retornar erro ao tentar registrar um usuário já existente", async () => {
    // Simula que o usuário já existe
    mockUserRepository.findByUsername.mockResolvedValue({ username: "testuser" } as IUser);

    // Espera que a função lance erro
    await expect(
      authService.register({ username: "testuser", password: "1234" } as IUser)
    ).rejects.toThrow("Usuário já cadastrado!");
  });

  test("Deve retornar erro ao logar com usuário inexistente", async () => {
    // Simula que o usuário não existe
    mockUserRepository.findByUsername.mockResolvedValue(null);

    // Espera que a função lance erro
    await expect(
      authService.login("testuser", "1234")
    ).rejects.toThrow("Usuário não encontrado!");
  });
});
