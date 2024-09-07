import models from '../models/index';

import { Op, Transaction } from 'sequelize';
import { ISubjectData } from '../interfaces/dto.interface';
import { convertKeysToCamel } from '../utils/converter.util';

const { Subject } = models;

export const findSubjectsByKeyword = async (search: string) => {
  const { count, rows } = await Subject.findAndCountAll({
    where: {
      name: {
        [Op.like]: `%${search}%`,
      },
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  });
  return {
    metadata: { total: count },
    data: rows,
  };
};

export const createSubject = async (
  transaction: Transaction,
  subjectData: ISubjectData,
) => {
  const newSubject = await Subject.create(convertKeysToCamel(subjectData), {
    transaction,
  });
  return newSubject;
};

export const findSubjectById = async (id: number) => {
  const subject = await Subject.findByPk(id, {
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  });
  if (!subject) {
    throw new Error('');
  }
  return {
    data: subject,
  };
};
