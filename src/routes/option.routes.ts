import { Router } from 'express';
import { getOptions } from '../controllers/option.controller';

const router = Router();

router.get('/', getOptions);

export default router;
