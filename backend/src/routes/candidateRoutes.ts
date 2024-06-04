import { Router } from 'express';
import { addCandidateController, getCandidateById, updateCandidateInterviewStep } from '../presentation/controllers/candidateController';

const router = Router();

router.post('/', addCandidateController);

router.get('/:id', getCandidateById);

router.put('/:id', updateCandidateInterviewStep);

export default router;
