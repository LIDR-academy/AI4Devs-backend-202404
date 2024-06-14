const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las peticiones
app.use(bodyParser.json());

// Conectar con MySQL
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Candidatoslti'
});

// Importar rutas
const candidateRoutes = require('./routes/candidateRoutes');

// Usar rutas
app.use('/api/candidates', candidateRoutes);

// Obtener todos los candidatos
app.get('/candidates', (req, res) => {
    pool.query('SELECT * FROM candidate', (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
});

// Obtener un candidato por ID
app.get('/candidates/:id', (req, res) => {
    const { id } = req.params;
    pool.query('SELECT * FROM candidate WHERE id = ?', [id], (error, result) => {
        if (error) throw error;
        res.status(200).json(result);
    });
});

// Crear un nuevo candidato
app.post('/candidates', (req, res) => {
    const { first_name, last_name, email, phone, address } = req.body;
    pool.query('INSERT INTO candidate (first_name, last_name, email, phone, address) VALUES (?, ?, ?, ?, ?)', [first_name, last_name, email, phone, address], (error, result) => {
        if (error) throw error;
        res.status(201).send(`Candidato añadido con ID: ${result.insertId}`);
    });
});

// Actualizar un candidato
app.put('/candidates/:id', (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, phone, address } = req.body;
    pool.query('UPDATE candidate SET first_name = ?, last_name = ?, email = ?, phone = ?, address = ? WHERE id = ?', [first_name, last_name, email, phone, address, id], (error, result) => {
        if (error) throw error;
        res.status(200).send(`Candidato actualizado con ID: ${id}`);
    });
});

// Eliminar un candidato
app.delete('/candidates/:id', (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM candidate WHERE id = ?', [id], (error, result) => {
        if (error) throw error;
        res.status(200).send(`Candidato eliminado con ID: ${id}`);
    });
});



app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
