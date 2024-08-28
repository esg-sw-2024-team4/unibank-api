import { Router } from 'express';
import { getQuestions } from '../controllers/question.controller';

const router = Router();

router.get('/', getQuestions);

export default router;
