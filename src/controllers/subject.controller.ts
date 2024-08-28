import { Request, Response } from 'express';
import { findSubjects } from '../services/subject.service';

export const getSubjects = async (req: Request, res: Response) => {
    try {
        res.json(await findSubjects());
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};
