import React from 'react';
import { useCart } from '../Usuario/CartContext';

export const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="container my-5">
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>No hay libros en el carrito</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.map((book) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={book.id}>
                <span>{book.titulo}</span>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeFromCart(book.id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <button className="btn btn-primary" onClick={clearCart}>
            Comprar Todo
          </button>
        </>
      )}
    </div>
  );
};
