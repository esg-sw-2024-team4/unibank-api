import jwt from 'jsonwebtoken';

import { IMResponse } from '../interfaces/dto.interface';

import { IInfoJWTPayload } from '../interfaces/jwt.interface';
import { JWT_SECRET } from '../config/env';

import User from '../models/user.model';

export const issueToken = ({ id, googleId, email }: IInfoJWTPayload) => {
  const token = jwt.sign({ id, googleId, email }, JWT_SECRET, {
    expiresIn: '3h',
  });
  return {
    data: token,
  } as IMResponse<string>;
};

export const deleteUser = async (id: number) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('Invalid request...');
  }
  await user.destroy();
};
