import { Router } from 'express';
import {
  auth,
  authCallback,
  deleteAccount,
} from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', auth);
router.get('/callback', authCallback);
router.delete('/', authMiddleware, deleteAccount);

export default router;
