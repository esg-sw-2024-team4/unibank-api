import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3010;

export const NODE_ENV = process.env.NODE_ENV || 'development';

export const JWT_SECRET = process.env.JWT_SECRET || 'aaaaa11111';

export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '3h';

export const {
  SESSION_SECRET,
  SESSION_MAX_AGE,
  FRONT_WEB_URL,
  FRONT_WEB_LOCAL_URL,
  DB_DIALECT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  BACKEND_URI,
} = process.env;
