import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3010;

export const NODE_ENV = process.env.NODE_ENV || 'development';

export const {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  FRONT_WEB_URL,
  FRONT_WEB_LOCAL_URL,
  DB_DIALECT,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  BACKEND_URI,
} = process.env;
