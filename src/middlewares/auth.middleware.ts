import { Request, Response, NextFunction } from 'express';

import logger from './logger.middleware';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized...' });
    }
    next();
  } catch (err: any) {
    logger.error(err?.message);
    return res.status(500).json({ message: 'Something went wrong...' });
  }
};
