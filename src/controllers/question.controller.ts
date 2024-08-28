import { Request, Response } from 'express';
import { findQuestions } from '../services/question.service';

export const getQuestions = async (req: Request, res: Response) => {
    try {
        res.json(await findQuestions());
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};
