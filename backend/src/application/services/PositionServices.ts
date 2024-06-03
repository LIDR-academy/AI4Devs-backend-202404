import { Candidate, Interview } from '../../domain/models/Types';
import { CandidateRepository } from '../../domain/models/CandidateRepository';

class PositionService {
  async getCandidatesForPosition(positionId: number) {
    const candidatesData = await CandidateRepository.getCandidatesByPosition(positionId);
    if (!candidatesData) {
      throw new Error('No candidates found for this position');
    }

    return candidatesData.candidates.map((candidate: Candidate) => {
      const totalScore = candidate.interviews.reduce((acc: number, curr: Interview) => acc + curr.score, 0);
      const averageScore = candidate.interviews.length > 0 ? totalScore / candidate.interviews.length : 0;
      return {
        fullName: candidate.candidate.fullName,
        currentInterviewStep: candidate.application.currentInterviewStep,
        averageScore: averageScore
      };
    });
  }
}

export default new PositionService();