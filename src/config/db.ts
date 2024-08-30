import { Dialect, Sequelize } from 'sequelize';

import dotenv from 'dotenv';
import {
  NODE_ENV,
  DB_DIALECT,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
} from './env';
dotenv.config();

const sequelize =
  NODE_ENV === 'test'
    ? new Sequelize('sqlite::memory:', {
        dialect: 'sqlite',
        logging: false,
      })
    : new Sequelize(DB_NAME!, DB_USER!, DB_PASSWORD, {
        host: DB_HOST,
        dialect: DB_DIALECT as Dialect,
        timezone: '+09:00',
        define: {
          timestamps: true,
          underscored: true,
        },
      });

export default sequelize;
