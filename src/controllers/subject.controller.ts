import { AuthRequest } from '../interfaces/http.interface';
import { Response } from 'express';

import { asyncHandler } from '../utils/async-handler.util';

import { findSubjects } from '../services/subject.service';

export const getSubjects = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    res.json(await findSubjects());
  },
);
