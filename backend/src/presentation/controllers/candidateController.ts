import { Request, Response } from 'express';
import { addCandidate, findCandidateById } from '../../application/services/candidateService';
import { updateInterviewStep } from '../../application/services/applicationService';

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

export const updateInterviewStepController = async (req: Request, res: Response) => {
    try {
        const candidateId = parseInt(req.params.id);
        const positionId = parseInt(req.body.positionId);
        const newStep = parseInt(req.body.currentInterviewStep);
        const application = await updateInterviewStep(candidateId, positionId, newStep);
        res.json(application);
    } catch (error) {
        console.error('Error updating interview step:', error);
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};



export { addCandidate };