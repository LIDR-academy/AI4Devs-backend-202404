import { Request, Response } from 'express';
import { addCandidate, findCandidateById, updateCandidateInterviewStepService, isValidInterviewStep } from '../../application/services/candidateService';

export const addCandidateController = async (req: Request, res: Response) => {
    try {
        const candidateData = req.body;
        const candidate = await addCandidate(candidateData);
        res.status(201).json({ message: 'Candidate added successfully', data: candidate });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error adding candidate', error: error.message });
        } else {
            res.status(400).json({ message: 'Error adding candidate', error: 'Unknown error' });
        }
    }
};

export const getCandidateById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        const candidate = await findCandidateById(id);
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        res.json(candidate);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const validateUpdateCandidateInterviewStep = async (candidateId: number, newCurrentInterviewStep: number, positionId: number) => {
    if (isNaN(candidateId) || !newCurrentInterviewStep || !positionId) {
        throw new Error('Invalid candidate ID, newCurrentInterviewStep, or positionId');
    }

    const isValidStep = await isValidInterviewStep(newCurrentInterviewStep);
    if (!isValidStep) {
        throw new Error('Invalid interview step ID');
    }
};

export const updateCandidateInterviewStep = async (req: Request, res: Response) => {
    try {
        const candidateId = parseInt(req.params.id);
        const { newCurrentInterviewStep, positionId } = req.body;

        await validateUpdateCandidateInterviewStep(candidateId, newCurrentInterviewStep, positionId);

        await updateCandidateInterviewStepService(candidateId, positionId, newCurrentInterviewStep);
        res.status(200).json({ message: 'Interview step updated successfully' });
    } catch (error) {
        if (error.message === 'Invalid candidate ID, newCurrentInterviewStep, or positionId' || error.message === 'Invalid interview step ID') {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

export { addCandidate }