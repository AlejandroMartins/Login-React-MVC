module.exports = {
  testEnvironment: 'node',  // Indica que os testes rodarão no ambiente Node.js
  transform: {
    '^.+\\.js$': 'babel-jest',  // Permite transformar arquivos JS usando Babel
  },
  moduleFileExtensions: ['js', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Arquivo para configurações extras de setup (se necessário)
};
