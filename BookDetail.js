import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../Usuario/CartContext';
import axios from 'axios';

export const BookDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Llamada a la API para obtener los detalles del libro
    fetch(`http://localhost:5000/libros/${id}`)
        .then((response) => response.json())
        .then((data) => {
            setBook(data);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error al obtener los detalles del libro:", error);
            setLoading(false);
        });
}, [id]);

if (loading) {
    return <div>Cargando detalles del libro...</div>;
}

if (!book) {
    return <div>No se encontró el libro</div>;
}

  return (
    <div className="container my-5">
      <h2>{book.titulo}</h2>
      <p><strong>Autor:</strong> {book.autor}</p>
      <p><strong>Año:</strong> {book.anio}</p>
      <p><strong>Género:</strong> {book.genero}</p>
      <button className="btn btn-success" onClick={() => addToCart({ id: book.id, titulo: book.titulo, autor: book.autor, anio: book.anio, genero: book.genero })}>
        Agregar al Carrito
      </button>
    </div>
  );
};

