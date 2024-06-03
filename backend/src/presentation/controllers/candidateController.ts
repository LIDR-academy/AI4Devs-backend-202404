import { Request, Response } from 'express';
import { addCandidate, findCandidateById, updateCandidateInterviewStep } from '../../application/services/candidateService';

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
    const { id } = req.params;
    console.log("id: "+id);
    // Validar que el ID sea un nmero entero
    const candidateId = parseInt(id, 10);
    if (isNaN(candidateId)) {
        return res.status(400).json({ message: 'Invalid candidate ID format. Must be an integer.' });
    }

    try {
        const result = await updateCandidateInterviewStep(candidateId);
        res.status(200).json(result);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error' });
        }
    }
};

export { addCandidate };