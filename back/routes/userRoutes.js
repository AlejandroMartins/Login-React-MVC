const express = require("express");
const UserController = require("../controllers/UserController");
const AuthService = require("../services/AuthService");
const UserRepository = require("../repositories/UserRepository");

const router = express.Router();

// Criando instâncias concretas e injetando a interface
const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const userController = new UserController(authService); // O Controller só vê a interface

// Rotas que chamam os métodos do Controller
router.post("/register", (req, res) => userController.register(req, res));
router.post("/login", (req, res) => userController.login(req, res));

module.exports = router;
