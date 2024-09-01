import { Router } from 'express';
import {
  auth,
  authCallback,
  checkIsAuthenticated,
  deleteAccount,
} from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', auth);
router.get('/callback', authCallback);
router.get('/check', authMiddleware, checkIsAuthenticated);
router.delete('/', authMiddleware, deleteAccount);

export default router;
