## Prompt Inicial
### User:
Tu misión en este ejercicio es crear dos nuevos endpoints que nos permitirán manipular la lista de candidatos de una aplicación en una interfaz tipo kanban.

El proyecto se encuentra en el  @backend 
Como podrás analizar tenemos el directorio @domain en donde se encuentra la lógica de negocio, el directorio @application donde se encuentran los casos de uso como services, @presentation en donde se encuentran los controladores del API y @routes en donde se definen los endpoints del API

Los siguientes son los requerimientos de los nuevos endpoints solicitados:
* GET /position/:id/candidates
Este endpoint recogerá todos los candidatos en proceso para una determinada posición, es decir, todas las aplicaciones para un determinado positionID. Debe proporcionar la siguiente información básica:
Nombre completo del candidato (de la tabla candidate).
current_interview_step: en qué fase del proceso está el candidato (de la tabla application).
La puntuación media del candidato. Recuerda que cada entrevist (interview) realizada por el candidato tiene un score
* PUT /candidate/:id
Este endpoint actualizará la etapa del candidato movido. Permite modificar la fase actual del proceso de entrevista en la que se encuentra un candidato específico.

GEnera los archivos necesarios para entregar las funcionalidades solicitadas.

## Prompt de conversación
Se solicitó al chat un informe de las conversaciones realizadas.

### User
Por favor genera un informe incluyendo todos los prompts realizados por el usuario (yo) y un resumen de las respuestas. Para hacerlo mas breve no incluir código.
### Chat
Informe de la Conversación
El usuario ha proporcionado una serie de fragmentos de código y ha solicitado ayuda para realizar varias tareas en un sistema de gestión de candidatos. A continuación se presenta un resumen de las solicitudes y respuestas:
1. Solicitud de Creación de Nuevos Endpoints:
Se requiere la creación de dos nuevos endpoints en una aplicación backend para manipular una lista de candidatos en una interfaz de estilo kanban.
2. Resolución de Errores en el Código:
Se identificó un error en el archivo positionService.ts al llamar a un método getAverageScore, que debería estar en el archivo Interview.ts.
Se solicitó mover la lógica para calcular el promedio de puntuación a un método estático getAverageScoreByApplicationId en la clase Interview.
3. Implementación de Funcionalidad Adicional:
Se solicitó crear un método en la clase Candidate para obtener el nombre completo del candidato.
Se pidió implementar la lógica para actualizar el paso de la entrevista de un candidato en el archivo candidateService.ts.
4. Actualización de la Lógica de Actualización de Paso de Entrevista:
Se solicitó modificar el método updateCandidateInterviewStep en candidateService.ts para incluir el parámetro applicationId y actualizar el paso de la entrevista en la aplicación asociada al candidato.
Resumen de Respuestas:
Se proporcionaron actualizaciones de código para crear nuevos archivos y funciones en los controladores, servicios y modelos relacionados con candidatos y posiciones.
Se corrigieron errores en la llamada a métodos y se movió la lógica de cálculo del promedio de puntuación a la clase Interview.
Se agregó un método getFullName a la clase Candidate para obtener el nombre completo del candidato.
Se actualizó la lógica en candidateService.ts para incluir la actualización del paso de la entrevista en la aplicación asociada al candidato.
Estas respuestas abordan las solicitudes del usuario para mejorar la funcionalidad y corregir errores en el sistema de gestión de candidatos.