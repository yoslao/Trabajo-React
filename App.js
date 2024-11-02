import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [anio, setAnio] = useState('');
    const [genero, setGenero] = useState('');
    const [librosListados, setLibrosListados] = useState([]);
    const [editarId, setEditarId] = useState(null);
    const [nuevoTitulo, setNuevoTitulo] = useState('');
    const [nuevoAutor, setNuevoAutor] = useState('');
    const [nuevoAnio, setNuevoAnio] = useState('');
    const [nuevoGenero, setNuevoGenero] = useState('');

    useEffect(() => {
        obtenerLibros();
    }, []);

    const obtenerLibros = async () => {
        const response = await axios.get('http://localhost:5000/libros');
        setLibrosListados(response.data);
    };

    const agregarLibro = async () => {
        if (titulo && autor && anio && genero) {
            const response = await axios.post('http://localhost:5000/libros', { titulo, autor, anio, genero });
            setLibrosListados([...librosListados, response.data]);
            setTitulo('');
            setAutor('');
            setAnio('');
            setGenero('');
        }
    };

    const eliminarLibro = async (id) => {
        await axios.delete(`http://localhost:5000/libros/${id}`);
        setLibrosListados(librosListados.filter(libro => libro.id !== id));
    };

    const prepararEdicion = (id, libro) => {
        setEditarId(id);
        setNuevoTitulo(libro.titulo);
        setNuevoAutor(libro.autor);
        setNuevoAnio(libro.anio);
        setNuevoGenero(libro.genero);
    };

    const actualizarLibro = async () => {
        if (nuevoTitulo && nuevoAutor && nuevoAnio && nuevoGenero) {
            await axios.put(`http://localhost:5000/libros/${editarId}`, { titulo: nuevoTitulo, autor: nuevoAutor, anio: nuevoAnio, genero: nuevoGenero});
            obtenerLibros();
            setEditarId(null);
            setNuevoTitulo('');
            setNuevoAutor('');
            setNuevoAnio('');
            setNuevoGenero('');
        }
    };

    return (
        <div className="App">
            <h1>Gestión de Libros</h1>
            <div>
                <input
                    type="text"
                    placeholder="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Autor"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Ao"
                    value={anio}
                    onChange={(e) => setAnio(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Genero"
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                />
                <button onClick={agregarLibro}>Agregar Libro</button>
            </div>

            <h2>Lista de Libros</h2>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Año</th>
                        <th>Género</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {librosListados.map(libro => (
                        <tr key={libro.id}>
                            <td>{libro.titulo}</td>
                            <td>{libro.autor}</td>
                            <td>{libro.anio}</td>
                            <td>{libro.genero}</td>
                            <td>
                                <button onClick={() => eliminarLibro(libro.id)}>Eliminar</button>
                                <button onClick={() => prepararEdicion(libro.id, libro)}>Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editarId !== null && (
                <div>
                    <h3>Editar Libro</h3>
                    <input
                        type="text"
                        placeholder="Nuevo Título"
                        value={nuevoTitulo}
                        onChange={(e) => setNuevoTitulo(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Nuevo Autor"
                        value={nuevoAutor}
                        onChange={(e) => setNuevoAutor(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Nuevo Año"
                        value={nuevoAnio}
                        onChange={(e) => setNuevoAnio(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Nuevo Genero"
                        value={nuevoGenero}
                        onChange={(e) => setNuevoGenero(e.target.value)}
                    />
                    <button onClick={actualizarLibro}>Actualizar Libro</button>
                </div>
            )}
        </div>
    );
}

export default App;

