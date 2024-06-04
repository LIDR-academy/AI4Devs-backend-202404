import { Candidate } from '../../domain/models/Candidate';

const getCandidatesByPosition = async (positionId: number) => {
  try {
    const candidates = await Candidate.findMany(positionId);

    return candidates.map((candidate) => {
      const application = candidate.applications.find(
        (app) => app.positionId === positionId,
      );
      const averageScore = application?.interviews.length
        ? application.interviews.reduce(
            (sum, interview) => sum + (interview.score || 0),
            0,
          ) / application.interviews.length
        : null;

      return {
        fullName: `${candidate.firstName} ${candidate.lastName}`,
        currentInterviewStep: application?.currentInterviewStep,
        averageScore,
      };
    });
  } catch (error) {
    console.error('Error al obtener candidatos por posición:', error);
    throw new Error('Error al recuperar los candidatos para la posición');
  }
};

export { getCandidatesByPosition };
