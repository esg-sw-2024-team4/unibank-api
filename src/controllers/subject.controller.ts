import { AuthRequest } from '../interfaces/session.interface';
import { Response } from 'express';

import { asyncHandler } from '../utils/async-handler.util';

import { findSubjects } from '../services/subject.service';

export const getSubjects = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    try {
      res.json(await findSubjects());
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
);
