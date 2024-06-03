export interface Interview {
    score: number;
  }
  
  export interface Candidate {
    candidate: {
      fullName: string;
    };
    application: {
      currentInterviewStep: string;
    };
    interviews: Interview[];
  }
  