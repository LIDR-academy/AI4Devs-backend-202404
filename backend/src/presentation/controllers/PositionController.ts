import { Request, Response } from 'express';
import PositionService from '../../application/services/PositionServices';

export const getCandidatesForPosition = async (req: Request, res: Response) => {
  try {
    const positionId = parseInt(req.params.id);
    const candidates = await PositionService.getCandidatesForPosition(positionId);
    res.status(200).json(candidates);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
