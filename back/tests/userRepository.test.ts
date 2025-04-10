// Importa o modelo User e o repositório a ser testado
import { User } from "../models/User";
import { UserRepository } from "../repositories/UserRepository";

// Importa utilitários do Jest para mocks
import { jest } from "@jest/globals";

describe("UserRepository", () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    // Cria uma nova instância antes de cada teste
    userRepository = new UserRepository();
  });

  afterEach(() => {
    // Limpa todos os mocks depois de cada teste
    jest.restoreAllMocks();
  });

  test("✅ Deve encontrar um usuário pelo nome de usuário", async () => {
    // Simula um usuário falso retornado do banco
    const fakeUser = { username: "testuser", password: "1234" };

    // Cria um mock no método estático findOne do Mongoose
    jest.spyOn(User, "findOne").mockResolvedValue(fakeUser as any);

    // Chama a função que queremos testar
    const result = await userRepository.findByUsername("testuser");

    // Verifica se o resultado é igual ao esperado
    expect(result).toEqual(fakeUser);
  });
});
