import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

import User from '../models/user.model';
import { JWT_SECRET } from '../config/env';
import { IJWTDecoded } from '../interfaces/jwt.interface';

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
        JWT_SECRET,
      ) as IJWTDecoded;
      const user = await User.findByPk(id);
      if (user) {
        req.user = user;
      }
    }
    next();
  } catch (err: any) {
    next(err);
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
      return res.status(401).json({ message: 'Unauthorized...' });
    }
    const { id } = jwt.verify(
      authorization.split(' ')[1],
      JWT_SECRET,
    ) as IJWTDecoded;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized...' });
    }
    req.user = user;
    next();
  } catch (err: any) {
    next(err);
  }
};
