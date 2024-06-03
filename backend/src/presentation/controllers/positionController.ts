import { Request, Response } from 'express';
import { getCandidatesByPosition, getPositionInterviewFlowById } from '../../application/services/positionService';

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

export const getPositionInterviewFlow = async (req: Request, res: Response) => {
    try {
        const positionId = parseInt(req.params.id);
        if (isNaN(positionId)) {
            return res.status(400).json({ error: 'Invalid position ID format' });
        }
        const interviewFlow = await getPositionInterviewFlowById(positionId);
        if (!interviewFlow) {
            return res.status(404).json({ error: 'Interview flow not found' });
        }
        res.json(interviewFlow);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};