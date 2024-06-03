import { Request, Response } from 'express';
import { getCandidatesByPosition } from '../../application/services/positionService';

export const getPositionCandidates = async (req: Request, res: Response) => {
    try {
        const positionId = parseInt(req.params.id);
        if (isNaN(positionId)) {
            return res.status(400).send({ message: "Invalid position ID" });
        }
        const candidates = await getCandidatesByPosition(positionId);
        res.json(candidates);
    } catch (error) {
        console.error('Error fetching candidates by position ID:', error);
        res.status(500).send({ message: "Internal server error" });
    }
};
