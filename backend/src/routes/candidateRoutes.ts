import { Router } from 'express';
import { addCandidateController, getCandidateById, updateCandidateInterviewStage } from '../presentation/controllers/candidateController';

const router = Router();

router.post('/', addCandidateController);

router.get('/:id', getCandidateById);

router.put('/:id', updateCandidateInterviewStage);

export default router;
