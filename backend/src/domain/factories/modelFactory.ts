import {
  Candidate,
  Education,
  WorkExperience,
  Resume,
  Application,
} from '../models';

class ModelFactory {
  static createModel(type: string, data: any) {
    switch (type) {
      case 'Candidate':
        return new Candidate(data);
      case 'Education':
        return new Education(data);
      case 'WorkExperience':
        return new WorkExperience(data);
      case 'Resume':
        return new Resume(data);
      case 'Application':
        return new Application(data);
      default:
        throw new Error('Unknown model type');
    }
  }
}

export default ModelFactory;
