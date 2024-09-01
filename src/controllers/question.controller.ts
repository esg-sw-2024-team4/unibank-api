import { asyncHandler } from '../utils/async-handler.util';

import { findQuestions } from '../services/question.service';

export const getQuestions = asyncHandler(async (req, res) => {
  res.json(await findQuestions());
});
