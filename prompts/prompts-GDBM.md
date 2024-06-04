### IDE: Cursor


## Prompts

1. Quiero que actues como un desarrollador senior. En base al proyecto @backend analizalo y crea el siguiente endpoint:

    `GET /position/:id/candidates`

    Este endpoint recogerá todos los candidatos en proceso para una determinada posición, es decir, todas las aplicaciones para un determinado positionID. Debe proporcionar la siguiente información básica:

    - Nombre completo del candidato (de la tabla candidate).
    - current_interview_step: en qué fase del proceso está el candidato (de la tabla application).
    - La puntuación media del candidato. Recuerda que cada entrevist (interview) realizada por el candidato tiene un score

    No escribas codigo aun, dime si tienes alguna duda o necesitas ayuda con algo.
***NOTA***: Se pide que ejecute paso a paso las modificaciones que sugiere. 

2. Vamos bien, ahora necesito que crees el endpoint `PUT /candidate/:id`
Este endpoint actualizará la etapa del candidato movido. Permite modificar la fase actual del proceso de entrevista en la que se encuentra un candidato específico. No escribas codigo aun, pregunta si tienes dudas.
***NOTA***: Se pide que ejecute paso a paso las modificaciones que sugiere. 

3. Teniendo en cuenta los cambios que acabas de sugerirme, ves necesario refactorizar alguna funcion o metodo en el que se puedan aplicar mejores practicas de desarrollo o aplicar principios SOLID y DRY?
   
4. Veo que las funciones findCandidatesByPositionId y updateCandidateInterviewStep de @candidateService no utilizan las funciones de los modelos como el resto de las funciones del archivo.
   
5. Perfecto, teniendo en cuenta las sugerencias de refactorizacion 1 y 2, crea las funciones en los modelos que sean necesarias para las funciones findCandidatesByPositionId y updateCandidateInterviewStep de @candidateService. Implementa la misma estructura de las funciones de los @models

6. Seria bueno tener en un archivo separado la funcion de findCandidatesByPositionId, es decir, implementar un nuevo archivo de rutas, controlador y servicio para este endpoint?

7. Es bueno tener las funciones findByPositionId y updateCandidateInterviewStep en el modelo Candidate? Si se estan aplicando buenas practicas y buen menejo de la estructura?
   
8. No serviria pasar alguna al modelo de application?