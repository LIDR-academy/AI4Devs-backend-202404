import { Router } from 'express';
import { getCandidatesByPositionIdController } from '../presentation/controllers/positionController';

const router = Router();

// Nueva ruta para obtener candidatos por ID de posición
router.get('/:id/candidates', getCandidatesByPositionIdController);

export default router;
