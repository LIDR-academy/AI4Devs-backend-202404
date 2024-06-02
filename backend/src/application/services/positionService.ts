import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCandidatesByPosition = async (positionIds: number[], page: number, limit: number) => {
    const offset = (page - 1) * limit;

    const candidates: any[] = await prisma.$queryRaw`
        SELECT 
            c.id AS candidate_id,
            c."firstName" || ' ' || c."lastName" AS full_name,
            p.id AS position_id,
            p.title AS position_name,
            istp.id AS current_interview_step_id,
            istp."name" AS current_interview_step_name,
            AVG(i.score) AS average_score
        FROM 
            "Candidate" c
        JOIN 
            "Application" a ON c.id = a."candidateId"
        JOIN 
            "Interview" i ON a.id = i."applicationId"
        JOIN 
            "Position" p ON a."positionId" = p.id
        JOIN 
            "InterviewStep" istp ON a."currentInterviewStep" = istp.id
        WHERE 
            p.id = ANY(${positionIds})
        GROUP BY 
            c.id, p.id, istp.id
        HAVING 
            COUNT(i.id) > 0
        ORDER BY 
            full_name ASC, position_name ASC
        LIMIT ${limit} OFFSET ${offset};
    `;

    if (candidates.length === 0) {
        throw new Error('No candidates found for the given position IDs.');
    }

    return candidates;
};
