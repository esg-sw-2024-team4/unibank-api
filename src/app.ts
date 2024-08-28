import express from 'express';

import userRoutes from './routes/user.routes';
import subjectRoutes from './routes/subject.routes';

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/subjects', subjectRoutes);

export default app;
