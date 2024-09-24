import express from 'express';

import cors from 'cors';
import corsOptions from './config/cors';

import session from 'express-session';

import cookieParser from 'cookie-parser';

import passport from './utils/passport';

import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger-output.json';

import authRoutes from './routes/auth.routes';
import subjectRoutes from './routes/subject.routes';
import questionRoutes from './routes/question.routes';

import handleError from './middlewares/error.middleware';

import db from './config/db';
import logger from './middlewares/logger.middleware';
import path from 'path';
import { NODE_ENV, SESSION_SECRET, SESSION_MAX_AGE } from './config/env';

const app = express();

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(
  session({
    secret: SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: NODE_ENV === 'production',
      httpOnly: true,
      maxAge: +SESSION_MAX_AGE! * 1000,
      sameSite: 'strict',
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

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

app.use('/api/auth', authRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/questions', questionRoutes);

app.use(handleError);

if (NODE_ENV === 'production') {
  import('helmet').then((helmet) => {
    app.use(helmet.default());
  });

  const webArtifacts = path.join(__dirname, '..', '..', 'web', 'dist');

  app.use(express.static(webArtifacts));

  app.use('/assets', express.static(path.join(webArtifacts, 'assets')));

  app.get('*', (_, res) => {
    res.sendFile(path.join(webArtifacts, 'index.html'));
  });
}

db.sync({ alter: true }).then(() => {
  logger.info(`Current environment: ${NODE_ENV}`);
  logger.info('Database connected!');
});

export default app;
