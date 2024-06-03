import { Request, Response } from 'express';
import { findCandidatesByPosition } from '../../application/services/applicationService';


export const getCandidatesByPositionIdController = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const candidates = await findCandidatesByPosition(id);
      res.send(candidates);
    } catch (error) {
      res.status(500).send({ message: error instanceof Error ? error.message : 'Unknown error'  });
    }
  };