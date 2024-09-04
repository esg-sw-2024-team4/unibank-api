import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

import User from '../models/user.model';
import { JWT_SECRET } from '../config/env';
import { IJWTDecoded } from '../interfaces/jwt.interface';
import logger from './logger.middleware';

export const authPassedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { authorization } = req.headers;
    if (authorization?.startsWith('Bearer ')) {
      const { id } = jwt.verify(
        authorization.split(' ')[1],
        JWT_SECRET!,
      ) as IJWTDecoded;
      const user = await User.findByPk(id);
      if (user) {
        req.user = user;
      }
    }
    next();
  } catch (err: any) {
    logger.error(err?.message);
    return res.status(401).json({ message: 'Invalid request...' });
  }
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new Error();
    }
    const { id } = jwt.verify(
      authorization.split(' ')[1],
      JWT_SECRET!,
    ) as IJWTDecoded;
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (err: any) {
    logger.error(err?.message);
    return res.status(401).json({ message: 'Invalid request...' });
  }
};
