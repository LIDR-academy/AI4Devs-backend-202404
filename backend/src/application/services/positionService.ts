import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCandidatesByPositionService = async (positionId: number) => {
    const applications = await prisma.application.findMany({
        where: { positionId },
        include: {
            candidate: true,
            interviews: true,
        },
    });

    return applications.map(app => ({
        fullName: `${app.candidate.firstName} ${app.candidate.lastName}`,
        currentInterviewStep: app.currentInterviewStep,
        averageScore: app.interviews.length ? app.interviews.reduce((acc, interview) => acc + (interview.score || 0), 0) / app.interviews.length : null,
    }));
};