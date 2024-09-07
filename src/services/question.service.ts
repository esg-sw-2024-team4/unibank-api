import { Transaction, where } from 'sequelize';
import { IOptionData, IQuestionData } from '../interfaces/dto.interface';
import models from '../models/index';
import { convertKeysToCamel } from '../utils/converter.util';

const { User, Subject, Question, UserAnswerQuestion, UserFavoriteQuestion } =
  models;

export const findQuestionsBySubject = async (
  subjectId: number,
  userId?: number,
) => {
  const subject = await Subject.findByPk(subjectId);
  if (!subject) {
    throw new Error('Subject not found...');
  }
  const questionsRaw = await subject.getQuestions({
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    include: [
      {
        association: Question.associations.options,
        attributes: { exclude: ['createdAt', 'updatedAt', 'question_id'] },
      },
    ],
  });
  if (!questionsRaw) {
    return {
      metadata: {
        total: 0,
      },
      data: [],
    };
  }
  let questions: any = questionsRaw.map((question) => question.toJSON());
  const total = questions.length || 0;
  if (userId) {
    for (let i = 0; i < total; ++i) {
      questions[i].isOwned = questions[i].author_id === userId;
      const userAnswer = await UserAnswerQuestion.findOne({
        where: { user_id: userId, question_id: questions[i].id },
      });
      if (userAnswer) {
        questions[i].answerSubmittedPreviously = userAnswer.answer;
      }
      questions[i].isFavorite = !!(await UserFavoriteQuestion.findOne({
        where: { user_id: userId, question_id: questions[i].id },
      }));
    }
  }
  questions = questions.map((question: any) => {
    const { SubjectQuestion, author_id: authorId, ...r } = question;
    return r;
  });
  return {
    metadata: {
      total,
    },
    data: questions,
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
  if (!user) {
    throw new Error('User not found...');
  }
  const subject = await Subject.findByPk(subjectId, { transaction });
  if (!subject) {
    throw new Error('Subject not found...');
  }
  const newQuestion = await user.createQuestion(
    convertKeysToCamel(questionData),
    { transaction },
  );
  await newQuestion.setSubjects([subject], { transaction });
  await Promise.all(
    optionsData.map((optionData) =>
      newQuestion.createOption(convertKeysToCamel(optionData), {
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
  if (!question) {
    throw new Error('Question not found...');
  }
  if (userId !== convertKeysToCamel(question.dataValues).authorId) {
    throw new Error('Unauthorized...');
  }
  const subject = await Subject.findByPk(subjectId, { transaction });
  if (!subject) {
    throw new Error('Subject not found...');
  }
  const updatedQuestion = await question.update(
    convertKeysToCamel(questionData),
    {
      transaction,
    },
  );
  await updatedQuestion.setSubjects([subject], { transaction });
  const optionsExist = await updatedQuestion.getOptions({ transaction });
  if (optionsExist.length) {
    await Promise.all(
      optionsExist.map((option) => option.destroy({ transaction })),
    );
  }
  await Promise.all(
    optionsData.map((optionData) =>
      updatedQuestion.createOption(convertKeysToCamel(optionData), {
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
    throw new Error('Question not found...');
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
  if (!user) {
    throw new Error('User not found...');
  }
  const answers = await user.getAnswers({ transaction });
  if (answers.length) {
    await answers[0].destroy({ transaction });
  }
  const userAnswerQuestions = await user.createAnswer(
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
  if (!user) {
    throw new Error('User not found...');
  }
  const questions = await user.getFavorites({
    where: { question_id: questionId },
    transaction,
  });
  if (!questions.length) {
    await user.createFavorite({ question_id: questionId }, { transaction });
  } else {
    await questions[0].destroy({ transaction });
  }
};
