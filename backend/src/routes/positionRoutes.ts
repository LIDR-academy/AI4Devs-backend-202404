import { Router } from 'express';
import { getPositionCandidates } from '../presentation/controllers/positionController';

const router = Router();

// Ruta para obtener candidatos por ID de posición
router.get('/:id/candidates', getPositionCandidates);

export default router;
