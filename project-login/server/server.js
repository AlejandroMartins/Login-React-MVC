// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Importa as bibliotecas necessárias
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Importa o modelo de usuário
const User = require('./models/User');

// Cria uma instância do aplicativo Express
const app = express();

// Middleware para analisar requisições JSON
app.use(express.json());
// Middleware para permitir requisições CORS
app.use(cors());

// Conecta ao banco de dados MongoDB usando a URI definida nas variáveis de ambiente
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB conectado'))
  .catch(err => console.log(err));

// Rota de Registro
app.post('/register', async (req, res) => {
    try {
      // Extrai username e password do corpo da requisição
      const { username, password } = req.body;
  
      // Verifica se username e password foram fornecidos
      if (!username || !password) {
        return res.status(400).json({ message: "Preencha todos os campos!" });
      }
  
      // Verifica se o usuário já existe no banco de dados
      const userExistente = await User.findOne({ username });
      if (userExistente) {
        return res.status(400).json({ message: "Usuário já cadastrado!" });
      }
  
      // Criptografa a senha antes de salvar no banco de dados
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Cria um novo usuário com o username e a senha criptografada
      const novoUsuario = new User({ username, password: hashedPassword });
      await novoUsuario.save();
  
      // Responde com sucesso
      res.status(201).json({ message: "Usuário criado com sucesso!" });
    } catch (error) {
      // Caso ocorra um erro, responde com erro do servidor
      res.status(500).json({ message: "Erro no servidor", error });
    }
});
  
// Rota de Login
app.post('/login', async (req, res) => {
    // Extrai username e password do corpo da requisição
    const { username, password } = req.body;
    // Busca o usuário no banco de dados
    const user = await User.findOne({ username });
  
    // Verifica se o usuário foi encontrado
    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado!' });
    }
  
    // Compara a senha fornecida com a senha armazenada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Ops, parece que sua senha está incorreta.' });
    }
  
    // Gera um token JWT para o usuário
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Responde com uma mensagem de sucesso
    res.json({ message: 'Logado com sucesso!'});
});
  
// Inicia o servidor na porta especificada nas variáveis de ambiente
app.listen(process.env.PORT, () => console.log(`Servidor rodando na porta ${process.env.PORT}`));
