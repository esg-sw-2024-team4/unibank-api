import express from 'express';

import cors from 'cors';
import corsOptions from './config/cors';

import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger-output.json';

import authRoutes from './routes/auth.routes';
import subjectRoutes from './routes/subject.routes';
import questionRoutes from './routes/question.routes';

import handleError from './middlewares/error.middleware';

import db from './config/db';
import logger from './middlewares/logger.middleware';
import { NODE_ENV } from './config/env';

const app = express();

app.use(cors(corsOptions));

if (NODE_ENV === 'production') {
  import('helmet').then((helmet) => {
    app.use(helmet.default());
  });
}

app.use(express.json());

if (NODE_ENV === 'development') {
  app.use(
    '/api-docs',
    swaggerUI.serve,
    swaggerUI.setup(swaggerDocument, {
      customCss:
        '.schemes-server-container, .auth-wrapper, .try-out { display: none !important; }',
    }),
  );
}

app.use('/auth', authRoutes);
app.use('/subjects', subjectRoutes);
app.use('/questions', questionRoutes);

app.use(handleError);

db.sync().then(() => {
  logger.info('Database connected!');
});

export default app;
