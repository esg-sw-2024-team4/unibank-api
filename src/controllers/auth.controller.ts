import { AuthRequest } from '../interfaces/session.interface';
import { NextFunction, Response } from 'express';

import { asyncHandler } from '../utils/async-handler.util';

import passport from '../utils/passport';

import { issueToken, deleteUser } from '../services/auth.service';
import User from '../models/user.model';

export const auth = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    passport.authenticate('google', { scope: ['profile', 'email'] })(
      req,
      res,
      next,
    );
  },
);

export const authCallback = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.query?.error) {
      throw new Error('Something went wrong...');
    }
    passport.authenticate(
      'google',
      { failWithError: true },
      async (errAuth: any, user: User, info: any) => {
        try {
          if (errAuth) {
            throw errAuth;
          }
          if (!user) {
            return res.status(401).json({ message: info });
          }
          const { id, googleId, email } = user;
          res.json(issueToken({ id, googleId, email }));
        } catch (err) {
          next(err);
        }
      },
    )(req, res, next);
  },
);

export const deleteAccount = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { user } = req;
    if (!user) {
      throw new Error('Invalid request...');
    }
    await deleteUser(user.id);
    res.status(204).end();
  },
);
