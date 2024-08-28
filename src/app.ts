import express from 'express';

import userRoutes from './routes/user.routes';
import subjectRoutes from './routes/subject.routes';
import questionRoutes from './routes/question.routes';
import optionRoutes from './routes/option.routes';
import answerRoutes from './routes/answer.routes';

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/subjects', subjectRoutes);
app.use('/questions', questionRoutes);
app.use('/options', optionRoutes);
app.use('/answers', answerRoutes);

export default app;
