import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Obtener libros desde el servidor
    axios.get('http://localhost:5000/libros')
      .then(response => {
        setBooks(response.data); // Guardar libros en el estado
      })
      .catch(error => {
        console.error("Error al obtener los libros:", error);
      });
  }, []);

  return (
    <div className="container my-4">
      <h2 className="mb-4">Libros Disponibles</h2>
      <div className="row">
        {books.map((book) => (
          <div className="col-md-4 mb-3" key={book.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{book.titulo}</h5>
                <p className="card-text">{book.autor}</p>
                <Link to={`/book/${book.id}`} className="btn btn-primary">
                  Ver Detalles
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

