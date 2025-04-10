import express from "express";
import { UserController } from "../controllers/UserController";
import { AuthService } from "../services/AuthService";
import { UserRepository } from "../repositories/UserRepository";

const router = express.Router();

// Injeção de dependência
const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const userController = new UserController(authService);

// Rotas
router.post("/register", (req, res) => userController.register(req, res));
router.post("/login", (req, res) => userController.login(req, res));

export default router;
