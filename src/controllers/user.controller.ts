import { Request, Response } from 'express';

import { asyncHandler } from '../utils/async-handler.util';

import { findUsers } from '../services/user.service';

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  try {
    res.json(await findUsers());
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});
