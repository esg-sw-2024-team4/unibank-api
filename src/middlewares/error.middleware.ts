import { Request, Response, NextFunction } from 'express';

export function handleError(err: any, req: Request, res: Response, _: NextFunction) {
    console.error(err);
    res.status(err.status || 500).json({
        message: err.message || 'Something went wrong...',
    });
}
