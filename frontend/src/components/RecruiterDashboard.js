import React from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const RecruiterDashboard = () => {
    return (
        <MainLayout title="Dashboard del Reclutador">
            <Row>
                <Col md={6}>
                    <Card className="shadow p-4">
                        <h5 className="mb-4">Añadir Candidato</h5>
                        <Link to="/add-candidate">
                            <Button variant="primary" className="btn-block">Añadir Nuevo Candidato</Button>
                        </Link>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="shadow p-4">
                        <h5 className="mb-4">Posiciones</h5>
                        <Link to="/positions">
                            <Button variant="primary" className="btn-block">Ver posiciones y sus aplicaciones</Button>
                        </Link>
                    </Card>
                </Col>
            </Row>
        </MainLayout>
    );
};

export default RecruiterDashboard;