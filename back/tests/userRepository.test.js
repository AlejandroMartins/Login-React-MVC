const UserRepository = require("../repositories/UserRepository");
const User = require("../models/User");
const sinon = require("sinon");

describe("UserRepository", () => {
  let userRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
    sinon.stub(User, "findOne"); // Stub direto no modelo User
  });

  afterEach(() => {
    sinon.restore(); // Restaura os métodos originais depois de cada teste
  });

  test("Deve encontrar um usuário pelo nome de usuário", async () => {
    const fakeUser = { username: "testuser", password: "1234" };
    User.findOne.resolves(fakeUser); // Agora funciona corretamente

    const result = await userRepository.findByUsername("testuser");
    expect(result).toEqual(fakeUser);
  });
});
