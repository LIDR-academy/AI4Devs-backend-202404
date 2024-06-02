# Prompt 1

## Requisitos

Experto desarrollador backend en NodeJS, Express y Prisma

## Descripción

Necesito agregar un endpoint de tipo PUT a mi aplicación, el cual será: /candidate/:id

Este endpoint actualizará la etapa del candidato movido. Permite modificar la fase actual del proceso de entrevista en la que se encuentra un candidato específico.

## Consideraciones

- No generes código
- Pregúntame todo lo que necesitas para llevar la solicitud acabo

# Prompt 2

1. La etapa de la aplicación no puede ser menor que la actual, por ejemplo, si estoy en la 3, no puedo volver a la 1. Recuerda validar también el id del candidato que viene como parámetro en la URL.

2. 204 en caso de éxito. En caso de error, dependiendo del error un código de error.

3. Solo el de la etapa.

4. Ninguno.

Recuerda usar el archivo @schema.prisma como referencia

La etapa de la aplicación se encuentra en la tabla Application, la cual está relacionada con currentInterviewStep

Recuerda usar los archivos @candidateService.ts @candidateController.ts y @candidateRoutes.ts para implementar la solución

En el body de la petición vendría el id de la aplicación y el id del nuevo step

Puedes usar el archivo @Application.ts para actualizar la etapa

# Prompt 3

Podrías darme un ejemplo de cómo hacer la petición con CURL?
