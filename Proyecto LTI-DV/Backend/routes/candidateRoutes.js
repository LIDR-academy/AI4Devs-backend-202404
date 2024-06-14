const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateControllers');

// Obtener todos los candidatos
router.get('/', candidateController.getAllCandidates);

// Obtener un candidato por ID
router.get('/:id', candidateController.getCandidateById);

// Crear un nuevo candidato
router.post('/', candidateController.createCandidate);

// Actualizar un candidato
router.put('/:id', candidateController.updateCandidate);

// Eliminar un candidato
router.delete('/:id', candidateController.deleteCandidate);

// Obtener candidatos por ID de posición
router.get('/position/:id/candidates', candidateController.getCandidatesByPositionId);

router.put('/:id', candidateController.updateCandidateInterviewStep);

router.put('/:id/interview-step', candidateController.updateCandidateInterviewStep);

module.exports = router;