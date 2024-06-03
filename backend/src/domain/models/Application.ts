import { PrismaClient } from '@prisma/client';
import { Interview } from './Interview';
import { Candidate } from './Candidate';


const prisma = new PrismaClient();

interface PositionDetails{
    id: number;
    interviewFlowId: number;
}

interface CandidateDetails {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export class Application {
    id?: number;
    positionId: number;
    candidateId: number;
    candidate?: CandidateDetails;
    applicationDate: Date;
    currentInterviewStep: number;
    notes?: string;
    interviews: Interview[]; // Added this line
    position?: PositionDetails;

    constructor(data: any) {
        this.id = data.id;
        this.positionId = data.positionId;
        this.candidateId = data.candidateId;
        this.candidate = data.candidate;
        this.applicationDate = new Date(data.applicationDate);
        this.currentInterviewStep = data.currentInterviewStep;
        this.notes = data.notes;
        this.interviews = data.interviews || []; // Added this line
        this.position = data.position ? {
            id: data.position.id,
            interviewFlowId: data.position.interviewFlowId
        } : undefined;
    }

    async save() {
        const applicationData: any = {
            positionId: this.positionId,
            candidateId: this.candidateId,
            applicationDate: this.applicationDate,
            currentInterviewStep: this.currentInterviewStep,
            notes: this.notes,
        };

        if (this.id) {
            return await prisma.application.update({
                where: { id: this.id },
                data: applicationData,
            });
        } else {
            return await prisma.application.create({
                data: applicationData,
            });
        }
    }

    static async findOne(id: number): Promise<Application | null> {
        const data = await prisma.application.findUnique({
            where: { id: id },
        });
        if (!data) return null;
        return new Application(data);
    }

    static async findAllByPosition(positionId: number): Promise<Application[]> {
        const data = await prisma.application.findMany({
            where: { positionId: positionId },
            include: {
                candidate: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    }
                },
                interviews: {
                    select: {
                        score: true,
                        interviewStep: {
                            select: {
                                id: true,  // Assuming you need the step ID to find the current step description elsewhere
                            }
                        }
                    }
                }
            }
        });
        console.log("Fetching all applications for position ID:", data);
        return data.map((application: any) => new Application({
            ...application, 
            candidate: application.candidate, 
            interviews: application.interviews
        }));
    }

    static async findOneByCandidateAndPosition(candidateId: number, positionId: number){
        const data = await prisma.application.findFirst({
            where: {
                candidateId: candidateId,
                positionId: positionId
            },
            include: {
                position: {
                    select: {
                        id: true,
                        interviewFlowId: true,
                    }
                }
            }
        });
        if (!data) return null;
        return new Application({
            ...data,
            position: data.position
        });
        
    }

    async updateCurrentInterviewStep(newStep: number): Promise<void> {
        if (!this.id) {
            throw new Error('Application ID is missing');
        }
        await prisma.application.update({
            where: { id: this.id },
            data: { currentInterviewStep: newStep },
        });
    }
}

