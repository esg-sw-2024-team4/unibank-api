import { asyncHandler } from '../utils/async-handler.util';
import {
  createSubject,
  findSubjectById,
  findSubjectsByKeyword,
} from '../services/subject.service';
import { withTransaction } from '../utils/with-transaction.util';

export const getSubjects = asyncHandler(async (req, res) => {
  const { search } = req.query;
  res.json(await findSubjectsByKeyword((search as string) || ''));
});

export const postSubject = asyncHandler(async (req, res) => {
  const subjectData = { ...req.body, author_id: req.user!.id };
  res.json(await withTransaction((tx) => createSubject(subjectData, tx)));
});

export const getSubjectById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  res.json(await findSubjectById(Number(id)));
});
