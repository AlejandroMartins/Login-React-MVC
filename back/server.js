require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Importa o pacote cors
const connectDB = require("./database/db");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Configura o CORS para permitir requisições do frontend
app.use(cors({
    origin: 'http://localhost:3000', // Permite acesso apenas do frontend na porta 3000
    methods: ['GET', 'POST'], // Métodos permitidos
    allowedHeaders: ['Content-Type'], // Cabeçalhos permitidos
}));

app.use(express.json());
app.use("/api", userRoutes);

// Conecta ao banco de dados e inicia o servidor
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
});
