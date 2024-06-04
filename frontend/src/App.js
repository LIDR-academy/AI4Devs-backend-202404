import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RecruiterDashboard from './components/RecruiterDashboard';
import AddCandidate from './components/AddCandidateForm'; // Asegrate de tener este componente
import PositionsPage from './components/PositionsPage'; // Asegrate de tener este componente
import PositionDetailPage from './components/PositionDetailPage'; // Asegrate de tener este componente
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RecruiterDashboard />} />
        <Route path="/add-candidate" element={<AddCandidate />} /> {/* Agrega esta línea */}
        <Route path="/positions" element={<PositionsPage />} /> {/* Agrega esta línea */}
        <Route path="/position/:id/detail" element={<PositionDetailPage />} /> {/* Agrega esta línea */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;