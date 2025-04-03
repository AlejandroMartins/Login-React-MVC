class IAuthService {
  /**
   * Registra um novo usuário.
   * @param {Object} user - { username: string, password: string }
   * @returns {Promise<{ message: string }>}
   */
  register(user) {}
  /**
   * Faz login no sistema.
   * @param {string} username
   * @param {string} password
   * @returns {Promise<{ message: string, token: string }>}
   */
  login(username, password) {}
}

module.exports = IAuthService;
