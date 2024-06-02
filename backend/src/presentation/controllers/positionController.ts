import { Request, Response } from 'express';
import { Position } from '../../domain/models/Position';

export const getPositionCandidatesController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        const position = await Position.findOne(id);
        if (!position) {
            throw new Error('Position not found');
        }
        const candidates = await position.getCandidates();
        res.json(candidates);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error retrieving candidates', error: error.message });
        } else {
            res.status(400).json({ message: 'Error retrieving candidates', error: 'Unknown error' });
        }
    }
};