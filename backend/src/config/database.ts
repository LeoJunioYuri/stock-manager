import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

type Dialect = 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';

const dialect: Dialect = (process.env.DB_DIALECT as Dialect) || 'mysql';

const sequelize = new Sequelize(
  process.env.DB_NAME || 'default_db_name',
  process.env.DB_USER || 'default_user',
  process.env.DB_PASSWORD || 'default_password', 
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: dialect,
    port: Number(process.env.DB_PORT) || 3306,
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();

export default sequelize;
