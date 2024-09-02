import { Transaction } from 'sequelize';
import { IQuestionData, ISResponse } from '../interfaces/dto.interface';
import Question from '../models/question.model';
import { convertKeysToCamel } from '../utils/converter.util';

export const findQuestions = async () => {
  const { count, rows } = await Question.findAndCountAll({
    attributes: {
      exclude: ['correct_answer', 'explanation', 'created_at', 'updated_at'],
    },
  });
  return {
    metadata: {
      total: count,
    },
    data: rows,
  } as ISResponse<any>;
};

export const findQuestionById = async (id: number) => {
  const question = await Question.findByPk(id);
  if (!question) {
    throw new Error('');
  }
  return question;
};

export const addQuestion = async (
  questionData: IQuestionData,
  transaction: Transaction,
) => {
  const data = convertKeysToCamel(questionData);

  const newQuestion = await Question.create(data, { transaction });
  return newQuestion;
};

export const modifyQuestion = async (
  id: number,
  updateData: Partial<IQuestionData>,
  transaction: Transaction,
) => {
  const question = await Question.findByPk(id);
  if (!question) {
    throw new Error('');
  }
  const data = convertKeysToCamel(updateData);
  await question.update(data, { transaction });
};

export const removeQuestion = async (id: number, transaction: Transaction) => {
  const question = await Question.findByPk(id);

  if (!question) {
    throw new Error('');
  }
  await question.destroy({ transaction });
};
