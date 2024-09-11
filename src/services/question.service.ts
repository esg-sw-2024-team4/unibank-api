import { Transaction } from 'sequelize';
import { IOptionData, IQuestionData } from '../interfaces/dto.interface';
import models from '../models/index';
import { convertKeysToCamel } from '../utils/converter.util';
import sequelize from '../config/db';

const { User, Subject, Question } = models;

export const findQuestionsBySubject = async (
  subjectId: number,
  userId?: number,
) => {
  const [results] = (await sequelize.query(
    userId
      ? `
      SELECT 
        q.id, 
        q.title, 
        q.description, 
        q.image_url, 
        q.source, 
        o.id AS option_id,
        o.option, 
        o.option_text, 
        o.is_correct,
        q.author_id,
        uaq.answer AS answer_submitted_previously,
        ufq.question_id IS NOT NULL AS is_favorite
      FROM questions q
      LEFT JOIN 
        options o 
          ON q.id = o.question_id
      LEFT JOIN 
        user_answer_questions uaq 
          ON q.id = uaq.question_id AND uaq.user_id = ${userId}
      LEFT JOIN 
        user_favorite_questions ufq 
          ON q.id = ufq.question_id AND ufq.user_id = ${userId}
      WHERE q.id IN (
        SELECT question_id 
        FROM subject_questions 
        WHERE subject_id = ${subjectId}
      )
        `
      : `
      SELECT 
        q.id, 
        q.title, 
        q.description, 
        q.image_url, 
        q.source, 
        o.id AS option_id,
        o.option, 
        o.option_text, 
        o.is_correct 
      FROM questions q 
      LEFT JOIN options o ON q.id = o.question_id 
      WHERE q.id IN (
        SELECT question_id 
        FROM subject_questions 
        WHERE subject_id = ${subjectId}
      )
        `,
  )) as any[];
  const questionsGrouped: any = {};
  results.forEach((row: any) => {
    const {
      id,
      title,
      description,
      image_url: imageUrl,
      source,
      option_id: optionId,
      option,
      option_text: optionText,
      is_correct: isCorrect,
      answer_submitted_previously: answerSubmittedPreviously,
      is_favorite: isFavorite,
      author_id: authorId,
    } = row;
    if (!questionsGrouped[id]) {
      questionsGrouped[id] = {
        id,
        title,
        description,
        imageUrl,
        source,
        options: [],
        isOwned: userId ? authorId === userId : undefined,
        answerSubmittedPreviously,
        isFavorite,
      };
    }
    questionsGrouped[id].options.push({
      id: optionId,
      option,
      optionText,
      isCorrect,
    });
  });
  const questions = Object.values(questionsGrouped);
  return {
    metadata: {
      total: questions.length,
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
  const answers = await user.getAnswers({
    where: { question_id: questionId },
    transaction,
  });
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
