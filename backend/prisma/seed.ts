import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Companies
  const company1 = await prisma.company.create({
    data: {
      name: 'Tech Corp',
    },
  });

  // Create Interview Flows
  const interviewFlow1 = await prisma.interviewFlow.create({
    data: {
      description: 'Standard interview process',
    },
  });

  const interviewFlow2 = await prisma.interviewFlow.create({
    data: {
      description: 'Data science interview process',
    },
  });

  // Create Positions
  const position1 = await prisma.position.create({
    data: {
      title: 'Software Engineer',
      description: 'Develop and maintain software applications.',
      status: 'Open',
      isVisible: true,
      location: 'Remote',
      jobDescription: 'Full-stack development',
      companyId: company1.id,
      interviewFlowId: interviewFlow1.id,
    },
  });

  const position2 = await prisma.position.create({
    data: {
      title: 'Data Scientist',
      description: 'Analyze and interpret complex data.',
      status: 'Open',
      isVisible: true,
      location: 'Remote',
      jobDescription: 'Data analysis and machine learning',
      companyId: company1.id,
      interviewFlowId: interviewFlow2.id,
    },
  });

  // Create Candidates
  const candidate1 = await prisma.candidate.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      address: '123 Main St',
      educations: {
        create: [
          {
            institution: 'University A',
            title: 'BSc Computer Science',
            startDate: new Date('2015-09-01'),
            endDate: new Date('2019-06-01'),
          },
        ],
      },
      workExperiences: {
        create: [
          {
            company: 'Company A',
            position: 'Software Developer',
            description: 'Developed web applications',
            startDate: new Date('2019-07-01'),
            endDate: new Date('2021-08-01'),
          },
        ],
      },
      resumes: {
        create: [
          {
            filePath: '/resumes/john_doe.pdf',
            fileType: 'application/pdf',
            uploadDate: new Date(),
          },
        ],
      },
    },
  });

  const candidate2 = await prisma.candidate.create({
    data: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '0987654321',
      address: '456 Elm St',
      educations: {
        create: [
          {
            institution: 'University B',
            title: 'MSc Data Science',
            startDate: new Date('2016-09-01'),
            endDate: new Date('2020-06-01'),
          },
        ],
      },
      workExperiences: {
        create: [
          {
            company: 'Company B',
            position: 'Data Scientist',
            description: 'Analyzed data sets',
            startDate: new Date('2020-07-01'),
            endDate: new Date('2022-08-01'),
          },
        ],
      },
      resumes: {
        create: [
          {
            filePath: '/resumes/jane_smith.pdf',
            fileType: 'application/pdf',
            uploadDate: new Date(),
          },
        ],
      },
    },
  });

  // Create Interview Types
  const interviewType1 = await prisma.interviewType.create({
    data: {
      name: 'Technical Interview',
      description: 'Assess technical skills',
    },
  });

  const interviewType2 = await prisma.interviewType.create({
    data: {
      name: 'HR Interview',
      description: 'Assess cultural fit',
    },
  });

  // Create Interview Steps
  const interviewStep1 = await prisma.interviewStep.create({
    data: {
      interviewFlowId: interviewFlow1.id,
      interviewTypeId: interviewType1.id,
      name: 'Initial Interview',
      orderIndex: 1,
    },
  });

  const interviewStep2 = await prisma.interviewStep.create({
    data: {
      interviewFlowId: interviewFlow1.id,
      interviewTypeId: interviewType2.id,
      name: 'Technical Interview',
      orderIndex: 2,
    },
  });

  // Create Employees
  const employee1 = await prisma.employee.create({
    data: {
      companyId: company1.id,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      role: 'Interviewer',
    },
  });

  const employee2 = await prisma.employee.create({
    data: {
      companyId: company1.id,
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      role: 'Interviewer',
    },
  });

  // Create Applications
  const application1 = await prisma.application.create({
    data: {
      positionId: position1.id,
      candidateId: candidate1.id,
      applicationDate: new Date(),
      status: 'Pending',
      currentInterviewStep: interviewStep1.id,
    },
  });

  const application2 = await prisma.application.create({
    data: {
      positionId: position2.id,
      candidateId: candidate1.id,
      applicationDate: new Date(),
      status: 'Pending',
      currentInterviewStep: interviewStep1.id,
    },
  });

  const application3 = await prisma.application.create({
    data: {
      positionId: position1.id,
      candidateId: candidate2.id,
      applicationDate: new Date(),
      status: 'Pending',
      currentInterviewStep: interviewStep1.id,
    },
  });

  const application4 = await prisma.application.create({
    data: {
      positionId: position2.id,
      candidateId: candidate2.id,
      applicationDate: new Date(),
      status: 'Pending',
      currentInterviewStep: interviewStep1.id,
    },
  });

  // Create Interviews
  await prisma.interview.createMany({
    data: [
      {
        applicationId: application1.id,
        interviewStepId: interviewStep1.id,
        employeeId: employee1.id,
        interviewDate: new Date(),
        result: 'Passed',
        score: 85,
        notes: 'Good technical skills',
      },
      {
        applicationId: application2.id,
        interviewStepId: interviewStep1.id,
        employeeId: employee1.id,
        interviewDate: new Date(),
        result: 'Passed',
        score: 90,
        notes: 'Excellent data analysis skills',
      },
      {
        applicationId: application3.id,
        interviewStepId: interviewStep1.id,
        employeeId: employee1.id,
        interviewDate: new Date(),
        result: 'Passed',
        score: 80,
        notes: 'Good technical skills',
      },
      {
        applicationId: application4.id,
        interviewStepId: interviewStep1.id,
        employeeId: employee1.id,
        interviewDate: new Date(),
        result: 'Passed',
        score: 88,
        notes: 'Strong data analysis skills',
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
