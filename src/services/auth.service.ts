import { Transaction } from 'sequelize';

import jwt from 'jsonwebtoken';

import { IInfoJWTPayload } from '../interfaces/jwt.interface';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env';

import User from '../models/user.model';
import { IUserProfile } from '../interfaces/dto.interface';

export const issueToken = ({ id, googleId, email }: IInfoJWTPayload) =>
  jwt.sign({ id, googleId, email }, JWT_SECRET!, {
    expiresIn: JWT_EXPIRES_IN || '3h',
  });

export const createOrUpdateUser = async (
  profile: IUserProfile,
  transaction: Transaction,
) => {
  const { googleId, email, name } = profile;
  let user = await User.findOne({ where: { googleId }, transaction });
  if (!user) {
    user = await User.create(
      {
        googleId,
        email,
        name,
      },
      { transaction },
    );
  } else {
    user.email = email;
    user.name = name;
    await user.save({ transaction });
  }
  return user;
};

export const deleteUser = async (id: number, transaction: Transaction) => {
  const user = await User.findByPk(id, { transaction });
  if (!user) {
    throw new Error('Invalid request...');
  }
  await user.destroy({ transaction });
};
