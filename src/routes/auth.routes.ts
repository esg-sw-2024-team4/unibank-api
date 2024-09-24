import { Router } from 'express';
import {
  auth,
  authCallback,
  getCurrentUser,
  deleteAccount,
  signout,
} from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', auth);
router.get('/callback', authCallback);
router.get('/fetch', getCurrentUser);
router.post('/signout', authMiddleware, signout);
router.delete('/', authMiddleware, deleteAccount);

export default router;
