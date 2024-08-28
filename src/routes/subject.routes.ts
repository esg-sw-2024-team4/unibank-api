import { Router } from 'express';
import { getSubjects } from '../controllers/subject.controller';

const router = Router();

router.get('/', getSubjects);

export default router;
