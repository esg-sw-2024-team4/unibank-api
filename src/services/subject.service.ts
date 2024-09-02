import Subject from '../models/subject.model';
import { Op, Transaction } from 'sequelize';
import { ISubjectData } from '../interfaces/dto.interface';
import { convertKeysToCamel } from '../utils/converter.util';

export const findSubjectsByKeyword = async (search: string) => {
  const { count, rows } = await Subject.findAndCountAll({
    where: {
      name: {
        [Op.like]: `%${search}%`,
      },
    },
  });
  return {
    metadata: { total: count },
    data: rows,
  };
};

export const createSubject = async (
  subjectData: ISubjectData,
  transaction: Transaction,
) => {
  const newSubject = await Subject.create(convertKeysToCamel(subjectData), {
    transaction,
  });
  return newSubject;
};

export const findSubjectById = async (id: number) => {
  const subject = await Subject.findByPk(id);
  if (!subject) {
    throw new Error('');
  }
  return subject;
};
