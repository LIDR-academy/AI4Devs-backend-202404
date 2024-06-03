import { InterviewStep } from '../../domain/models/InterviewStep';
import { Application } from '../../domain/models/Application';


export async function findCandidatesByPosition(id: number) {
    try {
        
        const applications = await Application.findAllByPosition(id);
        if (!applications) return [];

        return applications.map(app => {
            const candidate = app.candidate;
            const averageScore = app.interviews.reduce((acc, curr) => acc + (curr.score || 0), 0) / (app.interviews.length || 1);
            const currentInterviewStep = app.currentInterviewStep; // Assuming the last interview step is the current step

            return {
                name: candidate?.firstName + ' ' + candidate?.lastName,
                currentInterviewStep: currentInterviewStep,
                averageScore: averageScore
            };
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function updateInterviewStep(candidateId: number, positionId: number, newStepId: number) {

    // Retrieve the application after validation to ensure it exists
    const application = await Application.findOneByCandidateAndPosition(candidateId, positionId);
    if (!application) {
        throw new Error('Application not found');
    }
    if (!application.position){
        throw new Error('Position not found in application');
    }
    if (!application.position.interviewFlowId){
        throw new Error('Interview Flow ID not found in application');
    }
    
    await validateInterviewStepConditions(
        application.position.interviewFlowId, 
        application.currentInterviewStep, 
        newStepId
    );

    // Update the current interview step in the application
    return await application.updateCurrentInterviewStep(newStepId);
}

async function validateInterviewStepConditions(interviewFlowId: number, currentStepId: number, newStepId: number) {

    const newStep = await InterviewStep.findOne(newStepId);
    if (!newStep) {
        throw new Error('Interview step not found');
    }

    if (newStep.interviewFlowId !== interviewFlowId) {
        throw new Error('Interview step does not belong to the correct interview flow');
    }

    const currentStep = await InterviewStep.findOne(currentStepId);
    if (currentStep && newStep.orderIndex < currentStep.orderIndex) {
        throw new Error('Cannot set to a previous interview step');
    }
}
