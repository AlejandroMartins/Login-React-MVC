// Importa o AuthService, que será testado
const AuthService = require("../services/AuthService");

// Importa o Sinon, que permite criar mocks e stubs para simular chamadas de função
const sinon = require("sinon");


describe("AuthService", () => {
  let authService, mockUserRepository;

  // Antes de cada teste, cria um mock do repositório de usuários e uma nova instância do AuthService
  beforeEach(() => {
    // Simula um repositório de usuários com dois métodos
    mockUserRepository = {
      findByUsername: sinon.stub(), // Cria um stub para simular a busca no banco
      create: sinon.stub(), // Cria um stub para simular a inserção no banco
    };

    // Cria uma instância do AuthService usando o mock do repositório (injeção de dependência)
    authService = new AuthService(mockUserRepository);
  });

 
  test("Deve registrar um novo usuário", async () => {
    // Configura o mock para retornar 'null', indicando que o usuário não existe ainda
    mockUserRepository.findByUsername.resolves(null);

    mockUserRepository.create.resolves({ username: "testuser" });

    const result = await authService.register({
      username: "testuser",
      password: "1234",
    });

    // O resultado esperado é uma mensagem de sucesso
    expect(result).toEqual({ message: "Usuário criado com sucesso!" });
  });

  test("Deve retornar erro ao tentar registrar um usuário já existente", async () => {
    // Configura o mock para simular um usuário existente no banco
    mockUserRepository.findByUsername.resolves({ username: "testuser" });

    // Testa se a chamada a register lança um erro
    await expect(
      authService.register({ username: "testuser", password: "1234" })
    )
      .rejects
      .toThrow("Usuário já cadastrado!");
  });

  test("Deve retornar erro ao logar com usuário inexistente", async () => {
    // Configura o mock para simular que o usuário não existe no banco
    mockUserRepository.findByUsername.resolves(null);

    // Testa se a chamada a login lança um erro
    await expect(authService.login("testuser", "1234"))
      .rejects 
      .toThrow("Usuário não encontrado!");
  });
});
