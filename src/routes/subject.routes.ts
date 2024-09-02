import { Router } from 'express';
import {
  getSubjectById,
  getSubjects,
  postSubject,
} from '../controllers/subject.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getSubjects);
router.post('/', authMiddleware, postSubject);
router.get('/:id', getSubjectById);

export default router;
