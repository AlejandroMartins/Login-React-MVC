const express = require("express");
const UserController = require("../controllers/UserController");
const AuthService = require("../services/AuthService");
const UserRepository = require("../repositories/UserRepository");

const router = express.Router();

// Criar instâncias com injeção de dependência
const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const userController = new UserController(authService);

router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
