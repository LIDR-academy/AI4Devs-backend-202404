import { Request, Response } from 'express';
import { addCandidate, findCandidateById } from '../../application/services/candidateService';

export const addCandidateController = async (req: Request, res: Response) => {
    try {
        const candidateData = req.body;
        const candidate = await addCandidate(candidateData);
        res.status(201).json({ message: 'Candidate added successfully', data: candidate });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error adding candidate', error: error.message });
        } else {
            res.status(400).json({ message: 'Error adding candidate', error: 'Unknown error' });
        }
    }
};

export const getCandidateById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        const candidate = await findCandidateById(id);
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        res.json(candidate);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export async function getCandidatesByPosition(req: Request, res: Response) {
  try {
    const positionId = parseInt(req.params.id);
    if (isNaN(positionId)) {
      return res.status(400).json({ error: 'Formato de ID inválido' });
    }
    const positionWithCandidates = await req.prisma.position.findUnique({
      where: { id: positionId },
      include: { applications: { include: { candidate: true, interviewStep: true, interviews: true } } }  // Modificado aquí
    });

    if (!positionWithCandidates) {
      return res.status(404).json({ message: 'Posición no encontrada' });
    }

    const candidates = positionWithCandidates.applications.map(app => ({
      candidate: app.candidate,
      applicationDetails: app  // Agregado aquí
    }));
    res.json(candidates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al recuperar los candidatos' });
  }
}



export async function getInterviewStepsWithTypes(req: Request, res: Response) {
  try {
      const interviewSteps = await req.prisma.interviewStep.findMany({
          include: {
              interviewType: true // Asegúrate de que 'interviewType' sea el nombre correcto de la relación en tu modelo
          }
      });
      res.json(interviewSteps);
  } catch (error) {
      console.error('Error al obtener los pasos de entrevista:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
  }
}

export const updateApplicationInterviewStep = async (req: Request, res: Response) => {
  try {
      const { applicationId } = req.params;
      const { newInterviewStepId } = req.body;

      // Convertir el ID de string a número y verificar si es válido
      const applicationIdNum = parseInt(applicationId);
      if (isNaN(applicationIdNum)) {
          return res.status(400).json({ error: 'Formato de ID inválido' });
      }

      // Actualizar el interviewStepId de la aplicación
      const updatedApplication = await req.prisma.application.update({
          where: {
              id: applicationIdNum
          },
          data: {
              currentInterviewStep: newInterviewStepId
          }
      });

      if (!updatedApplication) {
          return res.status(404).json({ error: 'Aplicación no encontrada' });
      }

      res.json({ message: 'Paso de entrevista actualizado correctamente', data: updatedApplication });
  } catch (error) {
      console.error('Error al actualizar el paso de entrevista de la aplicación:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
};


export { addCandidate };