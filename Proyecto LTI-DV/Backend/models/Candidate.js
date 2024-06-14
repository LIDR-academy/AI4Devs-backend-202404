const db = require('../config/db');

class Candidate {
    static getAll(callback) {
        db.query('SELECT * FROM Candidate', function(err, results) {
            if (err) throw err;
            callback(results);
        });
    }

    static getById(id, callback) {
        db.query('SELECT * FROM Candidate WHERE id = ?', [id], function(err, results) {
            if (err) throw err;
            callback(results[0]);
        });
    }

    static update(id, candidateData, callback) {
        const { first_name, last_name, email, phone, address } = candidateData;
        const query = 'UPDATE Candidate SET first_name = ?, last_name = ?, email = ?, phone = ?, address = ? WHERE id = ?';
        db.query(query, [first_name, last_name, email, phone, address, id], function(err, results) {
            if (err) throw err;
            callback(results);
        });
    }
}

module.exports = Candidate;
