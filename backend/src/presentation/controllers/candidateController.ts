import { Request, Response } from 'express';
import { addCandidate, findCandidateById } from '../../application/services/candidateService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

export const updateCandidateInterviewStage = async (req: Request, res: Response) => {
    const { id } = req.params; // ID del candidato
    const { interviewStepId } = req.body; // Nuevo InterviewStep ID

    try {
        // Buscar la última aplicación del candidato
        const latestApplication = await prisma.application.findFirst({
            where: { candidateId: parseInt(id) },
            orderBy: { applicationDate: 'desc' }
        });

        if (!latestApplication) {
            return res.status(404).send({ message: 'No application found for this candidate' });
        }

        console.log(latestApplication);
        console.log(interviewStepId);
        // Actualizar el InterviewStep en la ltima entrevista de la aplicación
        const updatedInterview = await prisma.interview.updateMany({
            where: {
                applicationId: latestApplication.id,
                interviewStepId: latestApplication.currentInterviewStep
            },
            data: { interviewStepId: parseInt(interviewStepId) }
        });

        res.status(200).send({ message: 'Interview step updated successfully', data: updatedInterview });
    } catch (error) {
        res.status(500).send({ message: 'Error updating interview step', error: error as Error });
    }
};

