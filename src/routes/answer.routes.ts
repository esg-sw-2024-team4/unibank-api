import { Router } from 'express';
import { getAnswers } from '../controllers/answer.controller';

const router = Router();

router.get('/', getAnswers);

export default router;
