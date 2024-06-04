import { Router } from 'express';
import { addCandidate, getCandidateById,
   getCandidatesByPosition, getInterviewStepsWithTypes, 
   updateApplicationInterviewStep } from '../presentation/controllers/candidateController';

const router = Router();

router.post('/', async (req, res) => {
  try {
    // console.log(req.body); //Just in case you want to inspect the request body
    const result = await addCandidate(req.body);
    res.status(201).send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ message: error.message });
    } else {
      res.status(500).send({ message: "An unexpected error occurred" });
    }
  }
});


router.get('/position/:id/candidates', getCandidatesByPosition);
router.get('/interview-steps', getInterviewStepsWithTypes);
router.put('/application/:applicationId/interview-step', updateApplicationInterviewStep);


router.get('/positions', async (req, res) => {
  try {
    const positions = await req.prisma.position.findMany();
    res.json(positions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al recuperar las posiciones' });
  }
});


router.get('/:id', getCandidateById);

export default router;
