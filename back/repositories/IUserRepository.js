class IUserRepository {
  /**
   * Busca um usuário pelo nome de usuário.
   * @param {string} username - Nome de usuário a ser buscado.
   * @returns {Promise<Object | null>}
   */
  findByUsername(username) {}

  /**
   * Cria um novo usuário no banco de dados.
   * @param {Object} userData - Dados do usuário a serem salvos.
   * @returns {Promise<Object>}
   */
  create(userData) {}
}
module.exports = { IUserRepository };