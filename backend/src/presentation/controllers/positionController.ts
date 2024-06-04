import { Request, Response } from 'express';
import { findCandidatesByPositionId } from '../../application/services/positionService';

export const getCandidatesByPositionIdController = async (req: Request, res: Response) => {
    try {
        const positionId = parseInt(req.params.id);
        if (isNaN(positionId)) {
            return res.status(400).json({ error: 'Invalid position ID format' });
        }
        const candidates = await findCandidatesByPositionId(positionId);
        res.json(candidates);
    } catch (error) {
        console.error('Error retrieving candidates by position ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

