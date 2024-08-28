import { Request, Response, NextFunction } from 'express';

import logger from './logger.middleware';

const handleError = (err: any, _: Request, res: Response, __: NextFunction) => {
  logger.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong...',
  });
};

export default handleError;
