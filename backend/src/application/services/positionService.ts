import { Candidate, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCandidatesByPosition = async (positionId: number): Promise<Candidate[]> => {
    const candidates = await prisma.candidate.findMany({
        where: {
            applications: {
                some: {
                    positionId: positionId
                }
            }
        },
        include: {
            applications: true, // Asegúrate de incluir detalles relevantes
        }
    });
    // console.log('Candidates: ', candidates);
    return candidates;
};
