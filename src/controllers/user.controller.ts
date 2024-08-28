import { Request, Response } from 'express';
import { findUsers } from '../services/user.service';

export const getUsers = async (req: Request, res: Response) => {
    try {
        res.json(await findUsers());
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};
