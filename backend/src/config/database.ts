import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('product_db', 'yourusername', 'yourpassword', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
