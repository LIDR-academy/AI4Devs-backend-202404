import { Request, Response } from 'express';
import { getCandidatesByPosition } from '../../application/services/positionService';

export const getCandidatesByPositionController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    // Validar que los IDs sean enteros separados por comas
    const positionIds = id.split(',').map(Number);
    console.log("positionIds: "+positionIds);
    if (positionIds.some(isNaN)) {
        return res.status(400).json({ message: 'Invalid position IDs format. Must be integers separated by commas.' });
    }

    try {
        const candidates = await getCandidatesByPosition(positionIds, Number(page), Number(limit));
        res.status(200).json(candidates);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: errorMessage });
    }
};
