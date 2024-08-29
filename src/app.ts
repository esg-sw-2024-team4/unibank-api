import express from 'express';

import cors from 'cors';

import corsOptions from './config/cors';

import authRoutes from './routes/auth.routes';
import subjectRoutes from './routes/subject.routes';
import questionRoutes from './routes/question.routes';

import handleError from './middlewares/error.middleware';

import db from './config/db';
import logger from './middlewares/logger.middleware';

const app = express();

app.use(cors(corsOptions));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/subjects', subjectRoutes);
app.use('/questions', questionRoutes);

app.use(handleError);

db.sync().then(() => {
  logger.info('Database connected!');
});

export default app;
