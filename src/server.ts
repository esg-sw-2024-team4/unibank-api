import app from './app';

import { PORT } from './config/env';

import logger from './middlewares/logger.middleware';

const port = PORT || 3000;

app.listen(port, () => {
  logger.info(`Running on ${port}`);
});
