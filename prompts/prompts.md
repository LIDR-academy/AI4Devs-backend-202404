## Prompt 1

Tenemos el siguiente esquema de base de datos:
Application

Column Type Comment PK Nullable Default

id integer YES NO

positionId integer NO

candidateId integer NO

applicationDate timestamp without time zone NO

currentInterviewStep integer NO

notes text YES

Candidate

Column Type Comment PK Nullable Default

id integer YES NO

firstName varchar(100) NO

lastName varchar(100) NO

email varchar(255) NO

phone varchar(15) YES

address varchar(100) YES

Company

Column Type Comment PK Nullable Default

id integer YES NO

name text NO

Education

Column Type Comment PK Nullable Default

id integer YES NO

institution varchar(100) NO

title varchar(250) NO

startDate timestamp without time zone NO

endDate timestamp without time zone YES

candidateId integer NO

Employee

Column Type Comment PK Nullable Default

id integer YES NO

companyId integer NO

name text NO

email text NO

role text NO

isActive boolean NO true

Interview

Column Type Comment PK Nullable Default

id integer YES NO

applicationId integer NO

interviewStepId integer NO

employeeId integer NO

interviewDate timestamp without time zone NO

result text YES

score integer YES

notes text YES

InterviewFlow

Column Type Comment PK Nullable Default

id integer YES NO

description text YES

InterviewStep

Column Type Comment PK Nullable Default

id integer YES NO

interviewFlowId integer NO

interviewTypeId integer NO

name text NO

orderIndex integer NO

InterviewType

Column Type Comment PK Nullable Default

id integer YES NO

name text NO

description text YES

Position

Column Type Comment PK Nullable Default

id integer YES NO

companyId integer NO

interviewFlowId integer NO

title text NO

description text NO

status text NO 'Draft'::text

isVisible boolean NO false

location text NO

jobDescription text NO

requirements text YES

responsibilities text YES

salaryMin double precision YES

salaryMax double precision YES

employmentType text YES

benefits text YES

companyDescription text YES

applicationDeadline timestamp without time zone YES

contactInfo text YES

Resume

Column Type Comment PK Nullable Default

id integer YES NO

filePath varchar(500) NO

fileType varchar(50) NO

uploadDate timestamp without time zone NO

candidateId integer NO

WorkExperience

Column Type Comment PK Nullable Default

id integer YES NO

company varchar(100) NO

position varchar(100) NO

description varchar(200) YES

startDate timestamp without time zone NO

endDate timestamp without time zone YES

candidateId integer NO

\_prisma_migrations

Column Type Comment PK Nullable Default

id varchar(36) YES NO

checksum varchar(64) NO

finished_at timestamp with time zone YES

migration_name varchar(255) NO

logs text YES

rolled_back_at timestamp with time zone YES

started_at timestamp with time zone NO now()

applied_steps_count integer NO 0

Tenemos que hacer varios endpoints, pero vamos a empezar por el primero y luego ya te pasare cual es el siguiente.

1. GET /position/:id/candidates

Este endpoint debera traer:

- Nombre completo del candidato (de la tabla candidate).
- current_interview_step: en qué fase del proceso está el candidato (de la tabla application).
- La puntuación media del candidato.

Recuerda seguir la estructura que tenemos actualmente en el proyecto @backend y aplicar buenas practicas como DDD, SOLID y DRY.

No hagas codigo todavia y pregunta si tienes algo que quieres que te aclare

## Prompt 2

Perfecto! Vayamos a por el segundo endpoint que necesitamos:

PUT /candidate/:id

Este endpoint actualizará la etapa del candidato movido. Permite modificar la fase actual del proceso de entrevista en la que se encuentra un candidato específico.

Recuerda seguir la estructura del proyecto y la mejores practicas en cuanto a DDD, SOLID y DRY se refiere

## Prompt 3

Tenemos un error en la linea 113, que nos dice que application.save() no es una funcion, deberiamos hacer una instancia de Candidate para poder acceder a su metodo save?
@Candidate.ts @candidateService.ts

## Prompt 4

Genial, ahora lo hace correctamente pero la respuesta no llega la que espero, espero tener la informacion del usuario actualizada pero lo que obtengo es el usuario con la informacion que teniamos antes sobre el.

Se que esta funcionando porque al hacer un GET de ese candidato, el campo currentInterviewStep llega actualizado con el numero que le mande con el endpoint de PUT

## Prompt 5

Vale, ahora que ya tenemos todo funcionando, crees que deberiamos refactorizar los servicios,controladores y rutas para dividirlas en una para candidatos y otra para posiciones ?

## Prompt 6

teniendo ahora todo separado aplicando unas mejores practicas, crees que podriamos refactorizar algun servicio o controlador aplicando Extract Method o inline Method? @backend

## Prompt 7

ahora aplica este mismo refactor al servicio de position @positionService.ts

## Prompt 8

Ahora que tenemos refactorizado los servicios, crees que podriamos aplicar algun patron de diseño como por ejemplo singleton, factory, Observer o Strategy? @backend

## Prompt 9

puedes hacerme un archivo index para que no falle esta importacion? @modelFactory.ts

## Prompt 10

puedes actualizar el archivo @api-spec.yaml con lo que hemos hecho para los nuevos endpoints?

## Prompt 11

puedes recopilar todos los prompts literales que te he escrito para llegar hasta este punto del codigo para poder copiarlo y pegarlo en un archivo .md?

La estructura seria algo como:

## Prompt 1

......

## Prompt 2

.....
