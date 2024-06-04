import { Application } from '../../domain/models/Application';

export const findCandidatesByPositionId = async (positionId: number) => {
    try {
        return await Application.findByPositionId(positionId);
    } catch (error) {
        console.error('Error finding candidates by position ID:', error);
        throw new Error('Error retrieving candidates');
    }
};

