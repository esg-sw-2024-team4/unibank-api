import { asyncHandler } from '../utils/async-handler.util';

import { findSubjects } from '../services/subject.service';

export const getSubjects = asyncHandler(async (req, res) => {
  res.json(await findSubjects());
});
