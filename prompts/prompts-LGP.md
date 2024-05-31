# PROMPTS

1. Quiero que actues como un desarrollador backend senior. Analiza el proyecto @backend y resume brevemente qué endpoints y funcionalidades tiene. Explicame brevemente en qué se basa el proyecto, qué funcionalidad tiene el sistema

2. basándote en lo que ya tenemos implementando en @backend cuales crees que serían los siguientes pasos? no quiero que modifiques nada, solo dime cuál sería el siguiente endpoint para implementar

3. vamos a comenzar implementando un nuevo endpoint GET /position/:id/candidates, aquí tienes más detalles:


        Este endpoint recogerá todos los candidatos en proceso para una determinada posición, es decir, todas las aplicaciones para un determinado positionID. Debe proporcionar la siguiente información básica:

        - Nombre completo del candidato (de la tabla candidate).
        - current_interview_step: en qué fase del proceso está el candidato (de la tabla application).
        -La puntuación media del candidato. Recuerda que cada entrevist (interview) realizada por el candidato tiene un score"

    Quiero que actues como un arquitecto del software experimentado para definir el ticket para el desarrollo backend

4. Perfecto, empecemos con la implementacion para obtener los candidatos por posición.

5. ayudame a refactorizar @positionService.ts para mejorar la legibilidad del codigo, por ejemplo, añadiendo una funcion para calcular el averageScore

6. cuando el usuario aún no ha hecho ningun entrevista el averageScore es null, vamos a modificar esto para devolver un valor más adecuado y tener integridad en los datos.

7. teniendo en cuenta la estructura de datos @schema.prisma facilitame la consulta sql para obtener los candidatos que han aplicado a la position 1 y su puntuacion media. 

8. vamos a realizar pruebas unitarias para asegurar el correcto funcionamiento de getCandidatesByPositionService y getCandidatesByPosition

9. ahora vamos a implementar otro endpoint "PUT /candidate/:id"

        Este endpoint actualizará la etapa del candidato movido. Permite modificar la fase actual del proceso de entrevista en la que se encuentra un candidato específico.

    Quiero que actues como un arquitecto del software experimentado para definir el ticket para el desarrollo backend. Ten en cuenta que un candidato puede tener más de una aplicacion al haber aplicado a varias posiciones

10. no tenemos que actualizar todas las etapas de todas las aplicaciones, habrá que indicar para qué aplicacion concreta se quiere actualizar la etapa

11. Perfecto, empecemos con la implementacion para actualizar la etapa del candidato.

12. vamos a modificar @candidateController.ts para que tenga en cuenta que en el body recibirá dos parámetros

        {
            "applicationId": 2,
            "currentInterviewStep": 3
        }


13. vamos a realizar pruebas unitarias para asegurar el correcto funcionamiento de updateCandidateStageController y updateCandidateStage, quiero que sigas la misma estructura de los tests hechos para @positionController.test.ts  y @positionService.test.ts 

14. ahora vamos a actualizar @api-spec.yaml  para añadir estos dos nuevos endpoints que hemos añadido

Tickets => https://trello.com/b/QWY6fD2K/ats