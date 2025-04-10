import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import cors from "cors";
import connectDB from "./database/db";
import userRoutes from "./routes/userRoutes";

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 5000;

// Configura o CORS para permitir requisições do frontend
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
app.use("/api", userRoutes);

// Conecta ao banco de dados e inicia o servidor
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
});
