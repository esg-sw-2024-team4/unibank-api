import { Router } from 'express';
import {
  createQuestion,
  deleteQuestion,
  getQuestionsBySubject,
  submitFavoriteQuestion,
  submitUserAnswer,
  updateQuestion,
} from '../controllers/question.controller';
import {
  authMiddleware,
  authPassedMiddleware,
} from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authPassedMiddleware, getQuestionsBySubject);
router.post('/', authMiddleware, createQuestion);
router.put('/:id', authMiddleware, updateQuestion);
router.delete('/:id', authMiddleware, deleteQuestion);
router.post('/:id/submit', authMiddleware, submitUserAnswer);
router.post('/:id/favorite', authMiddleware, submitFavoriteQuestion);

export default router;
