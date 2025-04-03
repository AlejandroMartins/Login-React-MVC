const UserRepository = require("../repositories/UserRepository");
const User = require("../models/User");
const sinon = require("sinon"); // Biblioteca para criar mocks e stubs

describe("UserRepository", () => {
  let userRepository;

  // Executa antes de cada teste
  beforeEach(() => {
    userRepository = new UserRepository(); // Cria uma instância do UserRepository
    sinon.stub(User, "findOne"); // Substitui temporariamente o método findOne do modelo User por um stub
  });

  // Executa após cada teste
  afterEach(() => {
    sinon.restore(); // Restaura os métodos originais do modelo User para evitar interferências entre os testes
  });

  // Teste: Deve encontrar um usuário pelo nome de usuário
  test("Deve encontrar um usuário pelo nome de usuário", async () => {
    const fakeUser = { username: "testuser", password: "1234" };
    User.findOne.resolves(fakeUser); // Faz com que User.findOne retorne esse usuário falso

    const result = await userRepository.findByUsername("testuser"); // Chama a função a ser testada
    expect(result).toEqual(fakeUser); // Verifica se o resultado retornado é igual ao usuário falso esperado
  });
});
