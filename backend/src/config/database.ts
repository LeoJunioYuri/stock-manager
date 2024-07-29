import { Sequelize } from 'sequelize';

// Criação da instância do Sequelize
const sequelize = new Sequelize('stock_manager', 'root', 'Leo.mysql200', {
  host: 'localhost',
  dialect: 'mysql', 
});

// Função para testar a conexão
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Testa a conexão ao iniciar
testConnection();

export default sequelize;
