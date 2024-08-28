import express from 'express';

import userRoutes from './routes/user.routes';
import subjectRoutes from './routes/subject.routes';
import questionRoutes from './routes/question.routes';

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/subjects', subjectRoutes);
app.use('/questions', questionRoutes);

export default app;
