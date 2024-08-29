import dotenv from 'dotenv';
dotenv.config();

export default {
  origin: process.env.WHITELIST,
  credentials: true,
};
