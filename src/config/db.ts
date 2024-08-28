import { Sequelize } from 'sequelize';

import dotenv from 'dotenv';
dotenv.config();

interface IDBPoolOptions {
  max: number;
  min: number;
  acquire: number;
  idle: number;
}

interface IDBSQLConfig {
  dialect: 'mysql' | 'postgres';
  host: string;
  user: string;
  password: string;
  name: string;
  poolOptions: IDBPoolOptions;
}

interface IDB {
  [key: string]: IDBSQLConfig;
}

const configs: IDB = {
  development: {
    dialect: 'postgres',
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    name: process.env.DB_NAME!,
    poolOptions: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  test: {
    dialect: 'postgres',
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    name: process.env.DB_NAME!,
    poolOptions: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  production: {
    dialect: 'postgres',
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    name: process.env.DB_NAME!,
    poolOptions: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};

const config = configs[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config.name, config.user, config.password, {
  host: config.host,
  dialect: config.dialect,
  pool: config.poolOptions,
  timezone: '+09:00',
  define: {
    timestamps: true,
    underscored: true,
  },
});

export default sequelize;
