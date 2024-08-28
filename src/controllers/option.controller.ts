import { Request, Response } from 'express';
import { findOptions } from '../services/option.service';

export const getOptions = async (req: Request, res: Response) => {
    try {
        res.json(await findOptions());
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};
