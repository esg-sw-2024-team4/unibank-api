import { Dialect, Sequelize } from 'sequelize';

import dotenv from 'dotenv';
dotenv.config();

const { NODE_ENV, DB_DIALECT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } =
  process.env;

const sequelize =
  NODE_ENV === 'test'
    ? new Sequelize('sqlite::memory:', {
        dialect: 'sqlite',
        logging: false,
      })
    : new Sequelize(DB_NAME!, DB_USER!, DB_PASSWORD!, {
        host: DB_HOST!,
        dialect: DB_DIALECT as Dialect,
        timezone: '+09:00',
        define: {
          timestamps: true,
          underscored: true,
        },
      });

export default sequelize;
