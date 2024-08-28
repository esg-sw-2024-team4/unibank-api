import { Request } from 'express';

import User from '../models/user.model';

export interface AuthRequest extends Request {
  user?: User;
}
