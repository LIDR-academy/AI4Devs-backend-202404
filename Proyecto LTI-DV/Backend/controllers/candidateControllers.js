const Candidate = require('../models/Candidate');
const pool = require('../config/db');

exports.getAllCandidates = (req, res) => {
    Candidate.getAll((err, results) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).json(results);
        }
    });
};

exports.getCandidateById = (req, res) => {
    const { id } = req.params;
    Candidate.getById(id, (err, result) => {
        if (err) {
            res.status(500).send(err.message);
        } else if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).send('Candidato no encontrado');
        }
    });
};

exports.createCandidate = (req, res) => {
    const newCandidate = req.body;
    Candidate.create(newCandidate, (err, result) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(201).send(`Candidato añadido con ID: ${result.insertId}`);
        }
    });
};


exports.updateCandidate = (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, phone, address } = req.body;

    if (!first_name || !last_name || !email || !phone || !address) {
        return res.status(400).send('Todos los campos son requeridos');
    }

    // Continúa con la actualización en la base de datos...
};

exports.deleteCandidate = (req, res) => {
    const { id } = req.params;
    Candidate.delete(id, (err, result) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).send(`Candidato eliminado con ID: ${id}`);
        }
    });
};

exports.getCandidatesByPositionId = (req, res) => {
    const { id } = req.params;
    const query = `
    SELECT 
    CONCAT(c.first_name, ' ', c.last_name) AS full_name,
    a.current_interview_step,
    COALESCE(AVG(i.score), 0) AS average_score
FROM 
    Candidate c
    JOIN Application a ON c.id = a.candidate_id
    LEFT JOIN Interview i ON a.id = i.application_id
WHERE 
    a.position_id = ?
GROUP BY 
    c.id, full_name, a.current_interview_step
ORDER BY 
    full_name;
    `;

    pool.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).json(results);
        }
    });
};

exports.updateCandidateInterviewStep = (req, res) => {
    const { id } = req.params;
    const { current_interview_step } = req.body;

    // Imprimir los valores recibidos para diagnóstico
    console.log(`ID del candidato recibido: ${id}`);
    console.log(`Etapa de entrevista recibida: ${current_interview_step}`);

    const query = `
        UPDATE Application
        SET current_interview_step = ?
        WHERE candidate_id = ?;
    `;

    pool.query(query, [current_interview_step, id], (err, result) => {
        if (err) {
            console.log('Error al actualizar la etapa de entrevista:', err.message);
            res.status(500).send(err.message);
        } else {
            console.log(`Etapa de entrevista actualizada para el candidato con ID: ${id}`);
            res.status(200).send(`Etapa de entrevista actualizada para el candidato con ID: ${id}`);
        }
    });
};


exports.getInterviewFlowByPositionId = (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT p.name AS positionName, f.id, f.description, s.id AS stepId, s.name AS stepName, s.orderIndex
        FROM Position p
        JOIN InterviewFlow f ON p.interviewFlowId = f.id
        JOIN InterviewStep s ON f.id = s.interviewFlowId
        WHERE p.id = ?
        ORDER BY s.orderIndex;
    `;

    pool.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            const response = {
                positionName: results[0].positionName,
                interviewFlow: {
                    id: results[0].id,
                    description: results[0].description,
                    interviewSteps: results.map(r => ({
                        id: r.stepId,
                        interviewFlowId: r.id,
                        interviewTypeId: r.interviewTypeId, // Asumiendo que existe este campo
                        name: r.stepName,
                        orderIndex: r.orderIndex
                    }))
                }
            };
            res.status(200).json(response);
        }
    });
};