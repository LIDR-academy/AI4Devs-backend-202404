import React, { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { getPositions } from '../services/positionService';
import { Link } from 'react-router-dom'; // Importa Link

const PositionsPage = () => {
  // Datos de ejemplo, reemplaza esto con datos dinámicos si es necesario
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    _getPositions();
  }, []);

  const _getPositions = async () => {
    const response = await getPositions();
    setPositions(response);
  }

  return (
    <MainLayout>
      <h1>Elige una de las posiciones</h1>
      <ul className="list-group">
        { positions && positions.map((position) => (
         <li key={position.id} className="list-group-item">
         <Link to={`/position/${position.id}/detail`}>{position.title}</Link>
         <ul>
           <li>Descripción: {position.description}</li>
           <li>Descripción del trabajo: {position.jobDescription}</li>
           <li>Requisitos: {position.requirements}</li>
           <li>Rango Salarial: {position.salaryMin} - {position.salaryMax}</li>
           <li>Fecha límite de aplicación: {position.applicationDeadline}</li>
           <li>Descripción de la empresa: {position.company_description}</li>
           <li>Contacto: {position.contactInfo}</li>
         </ul>
         </li>
        ))}
      </ul>

      <br/>  
      <Link to={`/`}>Regresar</Link>

    </MainLayout>
  );
};

export default PositionsPage;