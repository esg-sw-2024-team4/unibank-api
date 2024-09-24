import models from '../models/index';

import { Transaction } from 'sequelize';

import { IUserProfile } from '../interfaces/dto.interface';

const { User } = models;

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
