import { Transaction } from 'sequelize';
import { IOptionData, IQuestionData } from '../interfaces/dto.interface';
import models from '../models/index';
import { convertKeysToCamel } from '../utils/converter.util';

const { User, Question, Subject } = models;

export const findQuestions = async (subjectId?: number) => {
  if (subjectId) {
    const subject = await Subject.findByPk(subjectId);
    const questions = await subject?.getQuestions({
      attributes: {
        exclude: ['created_at', 'updated_at'],
      },
      include: [Question.associations.options],
    });
    return {
      metadata: {
        total: questions?.length || 0,
      },
      data: questions,
    };
  }
  const { count, rows } = await Question.findAndCountAll({
    attributes: {
      exclude: ['created_at', 'updated_at'],
    },
    include: [Question.associations.options],
  });
  return {
    metadata: {
      total: count,
    },
    data: rows,
  };
};

export const findQuestionById = async (id: number) => {
  const question = await Question.findByPk(id, {
    include: [Question.associations.options],
  });
  if (!question) {
    throw new Error('');
  }
  return {
    data: question,
  };
};

export const addQuestion = async (
  transaction: Transaction,
  userId: number,
  subjectId: number,
  questionData: IQuestionData,
  optionsData: IOptionData[],
) => {
  const user = await User.findByPk(userId, { transaction });
  const newQuestion = await user?.createQuestion(
    convertKeysToCamel(questionData),
    { transaction },
  );
  const subject = await Subject.findByPk(subjectId, { transaction });
  await newQuestion?.setSubjects([subject!], { transaction });
  await Promise.all(
    optionsData.map((optionData) =>
      newQuestion?.createOption(convertKeysToCamel(optionData), {
        transaction,
      }),
    ),
  );
  return newQuestion;
};

export const modifyQuestion = async (
  transaction: Transaction,
  userId: number,
  questionId: number,
  subjectId: number,
  questionData: Partial<IQuestionData>,
  optionsData: IOptionData[],
) => {
  const question = await Question.findByPk(questionId, { transaction });
  if (userId !== convertKeysToCamel(question?.dataValues).authorId) {
    throw new Error('Unauthorized...');
  }
  const newQuestion = await question?.update(convertKeysToCamel(questionData), {
    transaction,
  });
  const subject = await Subject.findByPk(subjectId, { transaction });
  await newQuestion?.setSubjects([subject!], { transaction });
  const optionsExist = await newQuestion?.getOptions();
  if (optionsExist?.length) {
    await Promise.all(
      optionsExist.map((option) => option.destroy({ transaction })),
    );
  }
  await Promise.all(
    optionsData.map((optionData) =>
      newQuestion?.createOption(convertKeysToCamel(optionData), {
        transaction,
      }),
    ),
  );
};

export const removeQuestion = async (
  transaction: Transaction,
  questionId: number,
) => {
  const question = await Question.findByPk(questionId, { transaction });
  if (!question) {
    throw new Error('');
  }
  await question.destroy({ transaction });
};

export const addOrUpdateUserAnswer = async (
  transaction: Transaction,
  userId: number,
  questionId: number,
  answer: number,
) => {
  const user = await User.findByPk(userId, { transaction });
  const answers = await user?.getAnswers({ transaction });
  if (answers?.length) {
    await answers[0].destroy({ transaction });
  }
  const userAnswerQuestions = await user?.createAnswer(
    { question_id: questionId, answer },
    { transaction },
  );
  return userAnswerQuestions;
};

export const toggleFavoriteQuestion = async (
  transaction: Transaction,
  userId: number,
  questionId: number,
) => {
  const user = await User.findByPk(userId, { transaction });
  const questions = await user?.getFavorites({
    where: { question_id: questionId },
    transaction,
  });
  if (!questions?.length) {
    await user?.createFavorite({ question_id: questionId }, { transaction });
  } else {
    await questions[0].destroy({ transaction });
  }
};
