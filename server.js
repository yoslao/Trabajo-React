const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conectar a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Ajusta esto si usas otro usuario
    password: '', // Ajusta esto si tu usuario tiene contraseña
    database: 'biblioteca'
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos MySQL');
    }
});

// Ruta para obtener todos los libros
app.get('/libros', (req, res) => {
    const sql = 'SELECT * FROM libros';
    db.query(sql, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

// Ruta para obtener un libro específico por ID
app.get('/libros/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM libros WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result[0]); // Solo enviamos el primer resultado
    });
});


// Ruta para agregar un nuevo libro
app.post('/libros', (req, res) => {
    const { titulo, autor, anio, genero } = req.body;
    const sql = 'INSERT INTO libros (titulo, autor, anio, genero) VALUES (?, ?, ?, ?)';
    db.query(sql, [titulo, autor, anio, genero], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ id: result.insertId, titulo, autor, anio, genero });
    });
});

// Ruta para eliminar un libro
app.delete('/libros/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM libros WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Libro eliminado correctamente' });
    });
});

// Ruta para actualizar un libro
app.put('/libros/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, autor, anio, genero } = req.body;
    const sql = 'UPDATE libros SET titulo = ?, autor = ?, anio = ?, genero = ? WHERE id = ?';
    db.query(sql, [titulo, autor, anio, genero, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Libro actualizado correctamente' });
    });
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
