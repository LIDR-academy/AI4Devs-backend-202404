revisa el proyecto @backend no me comentes nada solo entiende la estructura y el codigo actual

Entiendo la estructura y el código actual del proyecto en el directorio [backend](file:///c%3A/Users/eriko/Documents/Fuentes/AIDeveloper/AI4Devs-backend/README.md#3%2C74-3%2C74). Aquí tienes un resumen:

backend/
Estructura del Proyecto
backend/
src/
index.ts: Punto de entrada del servidor.
application/: Lógica de aplicación.
domain/: Modelos de dominio.
infrastructure/: Comunicación con la base de datos.
presentation/: Controladores.
routes/: Definiciones de rutas para la API.
tests/: Archivos de prueba.
prisma/: Esquema de Prisma para ORM.
tsconfig.json: Configuración de TypeScript.
.env: Variables de entorno.
package.json: Dependencias y scripts de npm.
Archivos Clave
Rutas de Candidatos:
import { Router } from 'express';

import { addCandidate, getCandidateById } from '../presentation/controllers/candidateController';



const router = Router();



router.post('/', async (req, res) => {

  try {

    // console.log(req.body); //Just in case you want to inspect the request body

    const result = await addCandidate(req.body);

    res.status(201).send(result);

  } catch (error) {

    if (error instanceof Error) {

      res.status(400).send({ message: error.message });

    } else {

      res.status(500).send({ message: "An unexpected error occurred" });

    }

  }

});



router.get('/:id', getCandidateById);



export default router;


debemos crear dos endpoints que nos permitirán manipular la lista de candidatos de una aplicación en una interfaz tipo kanban, este seria el primero endpoint GET /position/:id/candidates
Este endpoint recogerá todos los candidatos en proceso para una determinada posición, es decir, todas las aplicaciones para un determinado positionID. Debe proporcionar la siguiente información básica:

Nombre completo del candidato (de la tabla candidate).
current_interview_step: en qué fase del proceso está el candidato (de la tabla application).
La puntuación media del candidato. Recuerda que cada entrevist (interview) realizada por el candidato tiene un score

Para implementar el endpoint GET /position/:id/candidates que recoge todos los candidatos en proceso para una determinada posición, proporcionando el nombre completo del candidato, la fase actual del proceso y la puntuación media del candidato, sigue estos pasos:

Me genera codigo sin tener en cuenta la arquitectura hexagonal
--....


pero sigue al estructura actual del proyecto con la arquitectura hexagonal propuesta en @backend 

Me genera codigo sin tener en cuenta la arquitectura hexagonal
--... 

por q que en @candidateService.ts propones usar directamente prisma? y no lo usas en el domain en el modelo candidate? para asegurar al arquitectura hexagonal

Para seguir la arquitectura hexagonal y mantener la lógica de acceso a datos en el dominio, debemos usar el modelo Candidate en lugar de acceder directamente a Prisma en el servicio.
Paso 1: Actualizar el servicio
En candidateService.ts:

Paso 2: Actualizar el modelo Candidate
En Candidate.ts:

Paso 3: Definir el controlador
En candidateController.ts:

Paso 4: Definir la ruta
En candidateRoutes.ts:

Probar el nuevo endpoint
Obtener todos los candidatos en proceso para una determinada posición:

  GET http://localhost:3010/position/1/candidates

PUT /candidate/:id
Este endpoint actualizará la etapa del candidato movido. Permite modificar la fase actual del proceso de entrevista en la que se encuentra un candidato específico.

Para implementar el endpoint PUT /candidate/:id que actualizará la etapa del candidato, sigue estos pasos:

Paso 1: Definir el servicio
En candidateService.ts:

Paso 2: Actualizar el modelo Candidate
En Candidate.ts:

Paso 3: Definir el controlador
En candidateController.ts:

Paso 4: Definir la ruta
En candidateRoutes.ts:

Probar el nuevo endpoint
Actualizar la etapa del candidato:

  PUT http://localhost:3010/candidate/1
  {
    "currentInterviewStep": "Entrevista Técnica"
  }

  
Con estos cambios, tendrás un nuevo endpoint que permite actualizar la etapa actual del proceso de entrevista en la que se encuentra un candidato específico.