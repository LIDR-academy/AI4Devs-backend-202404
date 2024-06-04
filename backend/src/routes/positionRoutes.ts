import { Request, Response } from 'express';
import { Position } from '../domain/models/Position';
import { getCandidatesByPosition } from '../presentation/controllers/positionController';


const router = require('express').Router();

router.get('/:id/candidates', getCandidatesByPosition);

export default router;