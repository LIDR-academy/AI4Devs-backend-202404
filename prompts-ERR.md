## Conversation with Cursor Bot (gpt-4o)

### Enrique
You are an experienced backend JS developer. Using the existing codebase in@backend , develop new endpoints. Adhere to the existing codestyle for the new development, the different dependencies used as tech stack are listed in@package.json . Let me know if you have any unclear points.
- The first endpoint is to be added is *GET /position/:id/candidates* where :id is a parameter that selects the position. For a given position, the endpoint will return all the candidates having applied to the position. For each candidate, we will be returning:
	- full name, from candidate table
	- current_interview_step from application table
	- the average score which is calculated from the `score` column of each row of `interview` table

Implement all the layers in order to retrieve the data from the database and return it from the top level component which will be in package @routes 


### Enrique
all the code that has been added for GET /position/:id/candidates is better suited if put into a new route "positionRoutes.ts" as well as appropiate controller and service. Please refactor accordingly

### Enrique
in @positionService.ts  refactor so currentInterviewStep can be the label related to that id, that is InterviewStep.name

### Bot
Sure, let's refactor the positionService.ts to include the InterviewStep.name as the currentInterviewStep label.
Updated positionService.ts
...



Full Code Changes
backend/src/routes/positionRoutes.ts
...

backend/src/presentation/controllers/positionController.ts
...

backend/src/application/services/positionService.ts
...

backend/src/index.ts
...

===> Not sure why the bot is showing me changes in the "Full code changes" section, otherwise I am not understanding it correctly.


