import jwt from 'jsonwebtoken';

import { IInfoJWTPayload } from '../interfaces/jwt.interface';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env';

import User from '../models/user.model';

export const issueToken = ({ id, googleId, email }: IInfoJWTPayload) =>
  jwt.sign({ id, googleId, email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN || '3h',
  });

export const deleteUser = async (id: number) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('Invalid request...');
  }
  await user.destroy();
};
