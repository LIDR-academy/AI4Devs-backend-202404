import React, { useEffect, useState } from 'react';
import { useFetcher, useParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Row, Col, Table, Modal, Spinner } from 'react-bootstrap';
import { getPositionDetail, getInterviewSteps, updateInterviewStep } from '../services/positionService';
const PositionDetailPage = () => {
    const { id } = useParams(); // Extrae el id del URL
    const [loading, setLoading] = useState(false);
    const [candidates, setCandidates] = useState([]);
    const [interviewSteps, setInterviewSteps] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [applicationId, setApplicationId] = useState(null);
    let candidateReady = false;
    const [trelloData, setTrelloData] = useState({
        lanes: [
            // Más lanes aquí
        ]
    });

    useEffect(() => {
        if(id && !loading){
            _getCandidates();
        }
    }, [id]);


    const handleChangeStep = async (newStep) => {
        // Aquí lógica para actualizar el step en el backend
        try{
            const response = await updateInterviewStep(selectedCandidate?.applicationId, newStep);
            console.log('Respuesta del backend:', response);
            _getCandidates();
        }catch(error){
            console.error('Error al actualizar el paso de entrevista:', error); 
        }finally{
            setShowModal(false);
        }
    };



    const InterviewStepModal = () => (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Cambiar paso de entrevista</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!loading ? interviewSteps.map(step => (
                    <Button className='w-100' key={step.id} style={{marginLeft: '10px', display: 'block', marginBottom:10}} onClick={() => handleChangeStep(step.id)}>
                        {step.name}
                    </Button>
                )): <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>}
            </Modal.Body>
        </Modal>
    );


    const _getInterviewSteps = async (dataCandidates=null)=>{
        try{
            const interviewStepsResponse = await getInterviewSteps();
            setInterviewSteps(interviewStepsResponse.data);
                if(interviewStepsResponse.data){
                    let lanes = {
                        lanes: interviewStepsResponse.data.map(step => ({
                            id: step.id,
                            title: step.name,
                            label: step.interviewType.name,
                            cards: [] // Aquí irían las tarjetas de candidatos si las tuvieras
                            }))
                    };
                    lanes.lanes = lanes.lanes.map(lane => {
                        const filteredCandidates = dataCandidates.filter(candidate => candidate?.applicationDetails?.interviewStep?.id === lane.id);
                        const cards = filteredCandidates.map(candidate => ({
                            title: `${candidate.candidate.firstName} ${candidate.candidate.lastName}`,
                            description: `Email: ${candidate.candidate.email}`,
                            applicationId: candidate?.applicationDetails?.id,
                            currentInterviewStep: candidate?.applicationDetails?.currentInterviewStep,
                            interview: candidate?.applicationDetails?.interviews,
                        }));
                        console.log('candidatos',filteredCandidates)
                        return {
                            ...lane,
                            cards: cards
                        };
                    });
                    setTrelloData(lanes);
                    console.log(lanes)
            }
        }catch(error){
            console.error('Error al obtener datos iniciales:', error);
        }
    }


    const _getCandidates = async () => {
        setLoading(true);
        candidateReady = true;
        try {
            const positionResponse = await getPositionDetail(id);
            setCandidates(positionResponse.data);
            _getInterviewSteps(positionResponse.data);
        } catch (error) {
            console.error('Error al obtener datos de los candidatos:', error);
        } finally {
            setLoading(false);
        }
    };





    return (
        <MainLayout title="Estado de la posición">
           {
            trelloData && trelloData?.lanes?.length > 0 &&
            <Row>
                <Link to="/positions" className="btn btn-secondary mb-3">Regresar</Link>
                {trelloData.lanes.map(lane => (
                <Col key={lane.title} md={4}>
                    <Card className="bg-light mb-3">
                    <Card.Header>{lane.title}</Card.Header>
                    <Card.Body>
                        {lane.cards.map(card => (
                        <Card key={card.id} className="mb-2">
                            <Card.Body>
                            <h5 className="card-title">{card.title}</h5>
                            <p className="card-text">{card.description}</p>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Resultado</th>
                                        <th>Puntuación</th>
                                        <th>Notas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {card?.interview && card?.interview.map(interview => (
                                        <tr key={interview.id}>
                                            <td>{new Date(interview.interviewDate).toLocaleDateString()}</td>
                                            <td className={interview.result === 'Passed' ? 'text-success' : ''}>{interview.result}</td>
                                            <td>{interview.score}</td>
                                            <td>{interview.notes}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Button variant="primary" onClick={() => { setSelectedCandidate(card); setShowModal(true); }}>
                                Cambiar Paso
                            </Button>
                            </Card.Body>
                            
                        </Card>
                        ))}


                        <InterviewStepModal />
                        
                        
                    </Card.Body>
                    </Card>
                </Col>
                ))}
            </Row>
           }
            
           
           
        </MainLayout>
    );
};

export default PositionDetailPage;

