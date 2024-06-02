import { Request, Response } from 'express';
import { getCandidatesByPositionId } from '../../application/services/positionService';

export const getCandidatesByPositionIdController = async (
  req: Request,
  res: Response,
) => {
  const positionId = parseInt(req.params.id);

  try {
    const candidates = await getCandidatesByPositionId(positionId);
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
