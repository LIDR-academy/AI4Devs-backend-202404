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
    console.log('Candidates: ', candidates);
    return candidates;
    // return [
    //     { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '1234567890', address: '123 Main St, Anytown, USA' },
    //     { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', phone: '1234567890', address: '123 Main St, Anytown, USA' },
    // ];
};
