class IUserRepository {
   /**
   * Busca um usuário pelo nome de usuário.
   * @param {string} username - Nome do usuário
   * @returns {Promise<Object|null>}
   */
  findByUsername(username) {}
  /**
   * Cria um novo usuário.
   * @param {Object} userData - Dados do usuário
   * @returns {Promise<Object>}
   */
  create(userData) {}
}
module.exports = IUserRepository ;