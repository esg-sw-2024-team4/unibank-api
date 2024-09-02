import { Router } from 'express';
import {
  createQuestion,
  deleteQuestion,
  getQuestionById,
  getQuestions,
  updateQuestion,
} from '../controllers/question.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getQuestions);
router.get('/:id', authMiddleware, getQuestionById);
router.post('/', authMiddleware, createQuestion);
router.put('/:id', authMiddleware, updateQuestion);
router.delete('/:id', authMiddleware, deleteQuestion);

export default router;
