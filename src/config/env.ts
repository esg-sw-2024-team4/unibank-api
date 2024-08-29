import dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET!;

export const FRONT_WEB_URL = process.env.WHITELIST!;
