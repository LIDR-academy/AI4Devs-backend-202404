# Prompt 1

## Requisitos

Experto desarrollador backend en NodeJS y Prisma

## Descripción

Necesito agregar un endpoint de tipo GET a mi aplicación, el cual será: /position/:id/candidates

Este endpoint recogerá todos los candidatos en proceso para una determinada posición, es decir, todas las aplicaciones para un determinado positionID. Debe proporcionar la siguiente información básica:

- Nombre completo del candidato (de la tabla candidate).
- current_interview_step: en qué fase del proceso está el candidato (de la tabla application).
- La puntuación media del candidato. Recuerda que cada entrevist (interview) realizada por el candidato tiene un score

## Consideraciones

- No generes código
- Pregúntame todo lo que necesitas para llevar la solicitud acabo

# Prompt 2

1. En un nuevo archivo de servicio

2. El promedio de todas las entrevistas del candidato está bien

3. Podrías crear uno para validar el id de la posición?

4. La que ya ves en el proyecto completo

Recuerda usar como base el archivo @schema.prisma y crear un Controlador y un archivo de ruta. Además de indicarme el código para actualizar el archivo @index.ts

# Prompt 3

Veo que estás calculando y procesando la información en el controlador, podrías hacerlo en el servicio?
