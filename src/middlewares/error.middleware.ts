import { Request, Response, NextFunction } from 'express';

import logger from './logger.middleware';

const handleError = (err: any, req: Request, res: Response, _: NextFunction) => {
    logger.error(err);
    res.status(err.status || 500).json({
        message: err.message || 'Something went wrong...',
    });
};

export default handleError;
