import { Router } from 'express';
import { getPositionCandidates, getPositionInterviewFlow } from '../presentation/controllers/positionController';

const router = Router();

// Ruta para obtener candidatos por ID de posición
router.get('/:id/candidates', getPositionCandidates);

// Ruta para obtener el flujo de entrevista por ID de posición
router.get('/:id/interviewflow', getPositionInterviewFlow);

export default router;

