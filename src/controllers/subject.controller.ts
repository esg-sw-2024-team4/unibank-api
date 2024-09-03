import { asyncHandler } from '../utils/async-handler.util';
import {
  createSubject,
  findSubjectById,
  findSubjectsByKeyword,
} from '../services/subject.service';
import sequelize from '../config/db';

export const getSubjects = asyncHandler(async (req, res) => {
  // #swagger.description = "모든 과목 조회"
  res.json(await findSubjectsByKeyword((req.query.search as string) || ''));
});

export const postSubject = asyncHandler(async (req, res) => {
  // #swagger.description = "과목 등록"
  res.json(
    await sequelize.transaction((tx) =>
      createSubject(tx, { ...req.body, author_id: req.user!.id }),
    ),
  );
});

export const getSubjectById = asyncHandler(async (req, res) => {
  // #swagger.description = "기본 키로 과목 조회"
  res.json(await findSubjectById(+req.params.id));
});
