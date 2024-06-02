import { Router } from 'express';
import { getCandidatesByPositionIdController } from '../presentation/controllers/positionController';
import { Request, Response, NextFunction } from 'express';

const router = Router();

const validatePositionId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const positionId = parseInt(req.params.id);
  if (isNaN(positionId)) {
    return res.status(400).json({ error: 'Invalid position ID' });
  }
  next();
};

router.get(
  '/:id/candidates',
  validatePositionId,
  getCandidatesByPositionIdController,
);

export default router;
