import { Candidate } from '../../domain/models/Candidate';
import { Application } from '../../domain/models/Application';
import { Interview } from '../../domain/models/Interview';

export const getCandidatesForPosition = async (positionId: number) => {
    // Logic to retrieve candidates for a specific position
    // Retrieve all applications for the given positionId
    const applications = await Application.findByPositionId(positionId);

    // Initialize an empty array to store the candidates
    const candidates = [];

    // Loop through each application
    for (const application of applications) {
        // Retrieve the candidate associated with the application
        const candidate = await Candidate.findOne(application.candidateId);

        // Retrieve the current interview step for the application
        const currentInterviewStep = await application.currentInterviewStep;
        if (!application.id) {
            throw new Error('Application ID is null');
        }

        // Calculate the average score for the candidate
        const averageScore = await Interview.getAverageScoreByApplicationId(application.id);

        // Add the candidate data to the candidates array
        candidates.push({
            fullName: candidate?.getFullName(),
            currentInterviewStep,
            averageScore
        });
    }

    // Return the candidates array
    return candidates;
};

