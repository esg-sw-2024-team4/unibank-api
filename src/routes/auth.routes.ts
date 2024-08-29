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
router.delete('/', authMiddleware, deleteAccount);
router.get('/check', authMiddleware, checkIsAuthenticated);

export default router;
