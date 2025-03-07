import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sequelize from './config/database';
import router from './routes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', router);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    app.listen(3001, () => {
      console.log('Server running on port 3001');
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
