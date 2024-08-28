import { Request, Response } from 'express';
import { findAnswers } from '../services/answer.service';

export const getAnswers = async (req: Request, res: Response) => {
    try {
        res.json(await findAnswers());
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};
