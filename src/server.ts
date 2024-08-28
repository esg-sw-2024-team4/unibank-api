import app from './app';

import logger from './middlewares/logger.middleware';

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
    logger.info(`Running on ${PORT}`);
});
