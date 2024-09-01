import { Transaction } from 'sequelize';
import sequelize from '../config/db';

export const withTransaction = async <T>(
  cb: (tx: Transaction) => Promise<T>,
): Promise<T> => {
  const tx = await sequelize.transaction();
  try {
    const res = await cb(tx);
    await tx.commit();
    return res;
  } catch (err) {
    await tx.rollback();
    throw err;
  }
};
