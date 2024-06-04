import { Candidate } from '../../domain/models/Candidate';
import { validateCandidateData } from '../validator';
import { Application } from '../../domain/models/Application';
import candidateEventEmitter from '../../infrastructure/eventEmitter';
import ModelFactory from '../../domain/factories/modelFactory';
import { Education } from '../../domain/models/Education';
import { WorkExperience } from '../../domain/models/WorkExperience';

const saveEducations = async (
  educations: Education[],
  candidateId: number,
  candidate: Candidate,
) => {
  for (const education of educations) {
    const educationModel = ModelFactory.createModel(
      'Education',
      education,
    ) as Education;
    educationModel.candidateId = candidateId;
    await educationModel.save();
    candidate.education.push(educationModel);
  }
};

const saveWorkExperiences = async (
  workExperiences: WorkExperience[],
  candidateId: number,
  candidate: Candidate,
) => {
  for (const experience of workExperiences) {
    const experienceModel = ModelFactory.createModel(
      'WorkExperience',
      experience,
    ) as WorkExperience;
    experienceModel.candidateId = candidateId;
    await experienceModel.save();
    candidate.workExperience.push(experienceModel);
  }
};

const saveResumes = async (
  cv: any,
  candidateId: number,
  candidate: Candidate,
) => {
  const resumeModel = ModelFactory.createModel('Resume', cv) as any;
  resumeModel.candidateId = candidateId;
  await resumeModel.save();
  candidate.resumes.push(resumeModel);
};
const saveCandidateDetails = async (
  candidateData: any,
  candidateId: number,
  candidate: Candidate,
) => {
  if (candidateData.educations) {
    await saveEducations(candidateData.educations, candidateId, candidate);
  }

  if (candidateData.workExperiences) {
    await saveWorkExperiences(
      candidateData.workExperiences,
      candidateId,
      candidate,
    );
  }

  if (candidateData.cv && Object.keys(candidateData.cv).length > 0) {
    await saveResumes(candidateData.cv, candidateId, candidate);
  }
};

export const addCandidate = async (candidateData: any) => {
  try {
    validateCandidateData(candidateData); // Validar los datos del candidato
  } catch (error: any) {
    throw new Error(error);
  }

  const candidate = ModelFactory.createModel('Candidate', candidateData); // Crear una instancia del modelo Candidate
  try {
    const savedCandidate = await candidate.save(); // Guardar el candidato en la base de datos
    const candidateId = savedCandidate.id; // Obtener el ID del candidato guardado

    await saveCandidateDetails(candidateData, candidateId, savedCandidate);
    candidateEventEmitter.emit('candidateAdded', savedCandidate); // Emitir evento
    return savedCandidate;
  } catch (error: any) {
    if (error.code === 'P2002') {
      // Unique constraint failed on the fields: (`email`)
      throw new Error('The email already exists in the database');
    } else {
      throw error;
    }
  }
};

export const findCandidateById = async (
  id: number,
): Promise<Candidate | null> => {
  try {
    const candidate = await Candidate.findOne(id);
    return candidate;
  } catch (error) {
    console.error('Error al buscar el candidato:', error);
    throw new Error('Error al recuperar el candidato');
  }
};

const getApplicationForCandidate = (candidate: Candidate) => {
  const applicationData = candidate.applications[0]; // Asumimos que hay una sola aplicación por candidato
  if (!applicationData) {
    throw new Error('Application not found for the candidate');
  }
  return new Application(applicationData);
};

export const updateCandidateInterviewStep = async (
  candidateId: number,
  newStep: number,
) => {
  try {
    const candidate = await Candidate.findOne(candidateId);
    if (!candidate) {
      throw new Error('Candidate not found');
    }

    const application = getApplicationForCandidate(candidate);
    application.currentInterviewStep = newStep;
    await application.save();

    // Volver a obtener el candidato para asegurarnos de que tenemos la información más reciente
    const updatedCandidate = await Candidate.findOne(candidateId);
    candidateEventEmitter.emit('candidateUpdated', updatedCandidate); // Emitir evento
    return updatedCandidate;
  } catch (error) {
    console.error(
      'Error al actualizar la etapa de la entrevista del candidato:',
      error,
    );
    throw new Error(
      'Error al actualizar la etapa de la entrevista del candidato',
    );
  }
};
