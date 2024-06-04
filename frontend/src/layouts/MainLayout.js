import React from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/lti-logo.png'; // Ruta actualizada para importar desde src/assets

const MainLayout = ({ title="Dashboard",children }) => {
    return (
        <Container className="mt-5">
            <div className="text-center"> {/* Contenedor para el logo */}
                <img src={logo} alt="LTI Logo" style={{ width: '150px' }} />
            </div>
            <h1 className="mb-4 text-center">{title}</h1>
            <Row>
                <Col md={12}>
                    
                        {children}
                </Col>
            </Row>
        </Container>
    );
};

export default MainLayout;