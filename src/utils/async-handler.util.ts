import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../interfaces/http.interface';

export const asyncHandler = (
  fn: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req as AuthRequest, res, next).catch(next);
  };
};
