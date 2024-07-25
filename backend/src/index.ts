import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sequelize from './config/database';
import router from './routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(router);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true }); // Sincronizar o modelo com o banco de dados
    app.listen(3001, () => {
      console.log('Server running on port 3001');
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
