import express from 'express';
import { getCandidatesForPosition } from '../controllers/PositionController';

const router = express.Router();

router.get('/position/:id/candidates', getCandidatesForPosition);

export default router;