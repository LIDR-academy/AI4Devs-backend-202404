import { getCandidatesByPosition } from '../positionService';
import { PrismaClient } from '@prisma/client';

jest.mock('@prisma/client', () => {
    const mPrisma = {
        candidate: {
            findMany: jest.fn(),
        },
    };
    return { PrismaClient: jest.fn(() => mPrisma) };
});

describe('getCandidatesByPosition', () => {
    it('should return a list of candidates for a given position ID', async () => {
        const prisma = new PrismaClient();
        const mockCandidates = [
            { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '1234567890', address: '123 Main St, Anytown, USA' },
            { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', phone: '1234567890', address: '123 Main St, Anytown, USA' },
        ];
        (prisma.candidate.findMany as jest.Mock).mockResolvedValue(mockCandidates);

        const positionId = 1;
        const candidates = await getCandidatesByPosition(positionId);

        expect(prisma.candidate.findMany).toHaveBeenCalledWith({
            where: {
                applications: {
                    some: {
                        positionId: positionId
                    }
                }
            },
            include: {
                applications: true,
            }
        });
        expect(candidates).toEqual(mockCandidates);
    });
});



