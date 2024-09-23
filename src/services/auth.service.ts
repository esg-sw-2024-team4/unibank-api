import models from '../models/index';

import { Transaction } from 'sequelize';

import jwt from 'jsonwebtoken';

import { IInfoJWTPayload } from '../interfaces/jwt.interface';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env';

import { IUserProfile } from '../interfaces/dto.interface';

const { User } = models;

export const issueToken = ({ id, googleId, email }: IInfoJWTPayload) =>
  jwt.sign({ id, googleId, email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

export const createOrUpdateUser = async (
  transaction: Transaction,
  profile: IUserProfile,
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

export const deleteUser = async (transaction: Transaction, id: number) => {
  const user = await User.findByPk(id, { transaction });
  if (!user) {
    throw new Error('Invalid request...');
  }
  await user.destroy({ transaction });
};
