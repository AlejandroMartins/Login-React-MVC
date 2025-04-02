/**
 * Interface para o serviço de autenticação
 * Define os métodos esperados e seus retornos
 */
class IAuthService {
  /**
   * @param {Object} user - { username: string, password: string }
   * @returns {Promise<Object>} - { message: string }
   */
  register(user) {}

  /**
   * @param {string} username
   * @param {string} password
   * @returns {Promise<Object>} - { message: string, token: string }
   */
  login(username, password) {}
}

module.exports = IAuthService;
