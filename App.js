import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { BookList } from './Usuario/BookList';
import { BookDetail } from './Usuario/BookDetail';
import { Cart } from './Usuario/Cart';
import { CartProvider } from './Usuario/CartContext';

// Ejemplo de lista de libros
const books = [
  { id: 1, title: 'Libro 1', description: 'Descripción del Libro 1' },
  { id: 2, title: 'Libro 2', description: 'Descripción del Libro 2' },
  { id: 3, title: 'Libro 3', description: 'Descripción del Libro 3' },
];

function App() {
  return (
    <CartProvider>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">Tienda de Libros</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Tienda</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">Carrito</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<BookList books={books} />} />
          <Route path="/book/:id" element={<BookDetail books={books} />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
