import { asyncHandler } from '../utils/async-handler.util';
import {
  addQuestion,
  addOrUpdateUserAnswer,
  findQuestionById,
  findQuestions,
  modifyQuestion,
  removeQuestion,
  toggleFavoriteQuestion,
} from '../services/question.service';
import sequelize from '../config/db';

export const getQuestions = asyncHandler(async (req, res) => {
  // #swagger.description = "모든 문제 조회"
  res.json(await findQuestions());
});

export const getQuestionById = asyncHandler(async (req, res) => {
  // #swagger.description = "기본 키로 문제 조회"
  res.json(await findQuestionById(+req.params.id));
});

export const createQuestion = asyncHandler(async (req, res) => {
  // #swagger.description = "문제 생성"
  const subjectId = req.body.subject_id;
  delete req.body.subject_id;
  const questionData = { ...req.body, author_id: req.user!.id };
  const optionsData = req.body.options;
  delete questionData.options;
  res.json(
    await sequelize.transaction((tx) =>
      addQuestion(tx, req.user!.id, subjectId, questionData, optionsData),
    ),
  );
});

export const updateQuestion = asyncHandler(async (req, res) => {
  // #swagger.description = "문제 정보 변경"
  const subjectId = req.body.subject_id;
  delete req.body.subject_id;
  const questionData = req.body;
  const optionsData = req.body.options;
  delete questionData.options;
  await sequelize.transaction((tx) =>
    modifyQuestion(
      tx,
      req.user!.id!,
      +req.params.id,
      subjectId,
      questionData,
      optionsData,
    ),
  );
  res.status(204).end();
});

export const deleteQuestion = asyncHandler(async (req, res) => {
  // #swagger.description = "문제 삭제"
  await sequelize.transaction((tx) => removeQuestion(tx, +req.params.id));
  res.status(204).end();
});

export const submitUserAnswer = asyncHandler(async (req, res) => {
  // #swagger.description = "사용자 답안 제출"
  res.json(
    await sequelize.transaction((tx) =>
      addOrUpdateUserAnswer(tx, req.user!.id, +req.params.id, req.body.answer),
    ),
  );
});

export const submitFavoriteQuestion = asyncHandler(async (req, res) => {
  // #swagger.description = "즐겨찾기 문제 토글(추가/제거)"
  await sequelize.transaction((tx) =>
    toggleFavoriteQuestion(tx, req.user!.id, +req.params.id),
  );
  res.status(204).end();
});
