import { Candidate } from '../../domain/models/Candidate';
import { DefaultScoreStrategy } from '../../domain/strategies/scoreStrategy';

const scoreStrategy = new DefaultScoreStrategy();

const calculateAverageScore = (interviews: any[]) => {
  return scoreStrategy.calculate(interviews);
};

const mapCandidateData = (candidate: Candidate, positionId: number) => {
  const application = candidate.applications.find(
    (app) => app.positionId === positionId,
  );
  const averageScore = calculateAverageScore(application?.interviews || []);

  return {
    fullName: `${candidate.firstName} ${candidate.lastName}`,
    currentInterviewStep: application?.currentInterviewStep,
    averageScore,
  };
};

const getCandidatesByPosition = async (positionId: number) => {
  try {
    const candidates = await Candidate.findMany(positionId);
    return candidates.map((candidate) =>
      mapCandidateData(candidate, positionId),
    );
  } catch (error) {
    console.error('Error al obtener candidatos por posición:', error);
    throw new Error('Error al recuperar los candidatos para la posición');
  }
};

export { getCandidatesByPosition };
