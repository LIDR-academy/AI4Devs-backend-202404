import { Request, Response } from 'express';
import { addCandidate, findCandidateById } from '../../application/services/candidateService';
import { Application } from '../../domain/models/Application';

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

export const updateCandidateInterviewStepController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { step, positionId } = req.body;
        if (isNaN(id) || !Number.isInteger(step) || !Number.isInteger(positionId)) {
            return res.status(400).json({ error: 'Invalid ID, step or positionId format' });
        }
        const application = await Application.findByCandidateAndPosition(id, positionId);
        if (!application) {
            throw new Error('Application not found');
        }
        await application.updateInterviewStep(step, positionId);
        res.status(204).end();
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error updating candidate', error: error.message });
        } else {
            res.status(400).json({ message: 'Error updating candidate', error: 'Unknown error' });
        }
    }
};

export { addCandidate };