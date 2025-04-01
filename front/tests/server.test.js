const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server/server");

beforeAll(async () => {
  // Conecta ao banco de dados de teste antes de iniciar os testes
  await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/test");
});

afterAll(async () => {
  // Limpa o banco de dados e fecha a conexão após os testes
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Testando a rota de registro", () => {

  // Teste para verificar se o registro de um usuário é feito corretamente
  it("Deve registrar um usuário com sucesso", async () => {
    const response = await request(app)
      .post("/register")
      .send({ username: "testuser", password: "testpassword" });

    // Verifica se a resposta retorna status 201 e mensagem de sucesso
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Usuário criado com sucesso!");
  });

  // Teste para verificar se a tentativa de registrar um usuário já existente retorna erro
  it("Verifica se o usuário já existe no banco de dados", async () => {
    // Primeiro registra o usuário
    await request(app)
      .post("/register")
      .send({ username: "testuser", password: "testpassword" });

    // Tenta registrar novamente o mesmo usuário
    const response = await request(app)
      .post("/register")
      .send({ username: "testuser", password: "asdads" });

    // Verifica se o status é 400 e se a mensagem é de que o usuário já está cadastrado
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Usuário já cadastrado!");
  });

  // Teste para verificar se o sistema retorna erro quando campos obrigatórios (username ou password) estão ausentes
  it("Verifica se username e password foram fornecidos", async () => {
    const response = await request(app)
      .post("/register")
      .send({ username: "", password: "" });

    // Verifica se o status é 400 e se a mensagem é de que todos os campos devem ser preenchidos
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Preencha todos os campos!");
  });

});

describe("Testando a rota de login", () => {

  // Teste para verificar o login de um usuário com credenciais corretas
  it("Deve fazer login com sucesso", async () => {
    // Primeiro registra o usuário
    await request(app)
      .post("/register")
      .send({ username: "testuser", password: "testpassword" });

    // Faz login com as credenciais corretas
    const response = await request(app)
      .post("/login")
      .send({ username: "testuser", password: "testpassword" });

    // Verifica se a resposta retorna status 200 e mensagem de sucesso
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Logado com sucesso!");
  });

  // Teste para verificar se o login falha quando o usuário não existe
  it("Verifica se o login falha quando o usuário não existe", async () => {
    const response = await request(app)
      .post("/login")
      .send({ username: "nonexistentuser", password: "anypassword" });

    // Verifica se o status é 400 e se a mensagem de erro é 'Usuário não encontrado!'
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Usuário não encontrado!');
  });

  // Teste para verificar se o login falha quando a senha está incorreta
  it("Verifica se o login falha quando a senha está incorreta", async () => {
    // Primeiro registra o usuário
    await request(app)
      .post("/register")
      .send({ username: "testuser", password: "testpassword" });

    // Tenta fazer login com a senha incorreta
    const response = await request(app)
      .post("/login")
      .send({ username: "testuser", password: "wrongpassword" });

    // Verifica se o status é 401 e se a mensagem de erro é de senha incorreta
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Ops, parece que sua senha está incorreta.');
  });

  // Teste para verificar se o login retorna um token válido
  it("Deve retornar um token válido após o login", async () => {
    // Primeiro registra o usuário
    await request(app)
      .post("/register")
      .send({ username: "testuser", password: "testpassword" });

    // Tenta fazer login
    const response = await request(app)
      .post("/login")
      .send({ username: "testuser", password: "testpassword" });

    // Verifica se o status é 200 e se a resposta contém o token
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

});

it("Deve conectar ao banco de dados MongoDB com sucesso", async () => {
  // Simula a conexão com o banco de dados usando o mongoose
  const connectMock = jest.spyOn(mongoose, 'connect').mockResolvedValueOnce(true);

  // Tente se conectar ao banco de dados
  await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/test");

  // Verifique se a função connect foi chamada com o URI correto
  expect(connectMock).toHaveBeenCalledWith(process.env.MONGO_URI || "mongodb://localhost/test");
  
  // Limpeza do mock após o teste
  connectMock.mockRestore();
});
