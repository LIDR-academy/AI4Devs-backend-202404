import axiosApi from './axiosApi';


export const getPositions = async (candidateData) => {
    try {
        const response = await axiosApi.get('/candidates/positions');
        return response.data;
    } catch (error) {
        throw new Error('Error al enviar datos del candidato:', error.response.data);
    }
};

export const getPositionDetail = async (id) => {
    try {
        const response = await axiosApi.get(`/candidates/position/${id}/candidates/`);
        return response;
    } catch (error) {
        throw new Error('Error al enviar datos del candidato:', error.response.data);
    }
};


export const getInterviewSteps = async () => {
    try {
        const response = await axiosApi.get('/candidates/interview-steps/');
        return response;
    } catch (error) {
        throw new Error('Error al enviar datos del candidato:', error.response.data);
    }
};

export const updateInterviewStep = async (applicationId, newStep) => {
    try {
        const response = await axiosApi.put(`/candidates/application/${applicationId}/interview-step`, { newInterviewStepId: newStep });
        return response;
    } catch (error) {
        throw new Error('Error al enviar datos del candidato:', error.response.data);
    }
};


