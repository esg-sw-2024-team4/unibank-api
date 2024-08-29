import { AuthRequest } from '../interfaces/http.interface';
import { Response } from 'express';

import { asyncHandler } from '../utils/async-handler.util';

import { findQuestions } from '../services/question.service';

export const getQuestions = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    res.json(await findQuestions());
  },
);
