import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class CandidateRepository {
  async getCandidatesByPosition(positionId: number) {
    return await prisma.position.findUnique({
      where: { id: positionId },
      include: {
        candidates: {
          include: {
            candidate: true,
            application: true,
            interviews: true,
          }
        }
      }
    });
  }
}

export default new CandidateRepository();