class UserController {
  constructor(authService) {
    this.authService = authService;
  }

  register = async (req, res) => {
    try {
      const result = await this.authService.register(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  login = async (req, res) => {
    try {
      const result = await this.authService.login(req.body.username, req.body.password);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

module.exports = UserController;
