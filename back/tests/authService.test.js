const AuthService = require("../services/AuthService");
const sinon = require("sinon");

describe("AuthService", () => {
  let authService, mockUserRepository;

  beforeEach(() => {
    mockUserRepository = {
      findByUsername: sinon.stub(),
      create: sinon.stub(),
    };
    authService = new AuthService(mockUserRepository);
  });

  test("Deve registrar um novo usuário", async () => {
    mockUserRepository.findByUsername.resolves(null);
    mockUserRepository.create.resolves({ username: "testuser" });

    const result = await authService.register({ username: "testuser", password: "1234" });
    expect(result).toEqual({ message: "Usuário criado com sucesso!" });
  });

  test("Deve retornar erro ao tentar registrar um usuário já existente", async () => {
    mockUserRepository.findByUsername.resolves({ username: "testuser" });

    await expect(authService.register({ username: "testuser", password: "1234" }))
      .rejects
      .toThrow("Usuário já cadastrado!");
  });

  test("Deve retornar erro ao logar com usuário inexistente", async () => {
    mockUserRepository.findByUsername.resolves(null);

    await expect(authService.login("testuser", "1234"))
      .rejects
      .toThrow("Usuário não encontrado!");
  });
});
