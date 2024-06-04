import { Request, Response } from 'express';
import {
  addCandidate,
  findCandidateById,
  updateCandidateInterviewStep,
} from '../../application/services/candidateService';

export const addCandidateController = async (req: Request, res: Response) => {
  try {
    const candidateData = req.body;
    const candidate = await addCandidate(candidateData);
    res
      .status(201)
      .json({ message: 'Candidate added successfully', data: candidate });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(400)
        .json({ message: 'Error adding candidate', error: error.message });
    } else {
      res
        .status(400)
        .json({ message: 'Error adding candidate', error: 'Unknown error' });
    }
  }
};

const getCandidateById = async (req: Request, res: Response) => {
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

const updateCandidateInterviewStepController = async (
  req: Request,
  res: Response,
) => {
  try {
    const candidateId = parseInt(req.params.id);
    const { newStep } = req.body;

    if (isNaN(candidateId) || isNaN(newStep)) {
      return res
        .status(400)
        .json({ error: 'Invalid candidate ID or interview step format' });
    }

    const updatedCandidate = await updateCandidateInterviewStep(
      candidateId,
      newStep,
    );
    res.json(updatedCandidate);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export {
  addCandidate,
  getCandidateById,
  updateCandidateInterviewStepController,
};
