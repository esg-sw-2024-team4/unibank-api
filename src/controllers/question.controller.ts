import { asyncHandler } from '../utils/async-handler.util';
import {
  addQuestion,
  findQuestionById,
  findQuestions,
  modifyQuestion,
  removeQuestion,
} from '../services/question.service';
import { withTransaction } from '../utils/with-transaction.util';

export const getQuestions = asyncHandler(async (_, res) => {
  res.json(await findQuestions());
});

export const getQuestionById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  res.json(await findQuestionById(Number(id)));
});

export const createQuestion = asyncHandler(async (req, res) => {
  const questionData = { ...req.body, author_id: req.user!.id };
  res.json(await withTransaction(async (tx) => addQuestion(questionData, tx)));
});

export const updateQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const questionData = req.body;
  await withTransaction(async (tx) =>
    modifyQuestion(Number(id), questionData, tx),
  );
  res.status(204).end();
});

export const deleteQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await withTransaction(async (tx) => removeQuestion(Number(id), tx));
  res.status(204).end();
});
