import React, { useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';

/**
 * Componente de la página de inicio.
 * Permite al usuario buscar un Pokémon por nombre o ID.
 */
export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  /**
   * Maneja el envío del formulario de búsqueda.
   * Redirige al usuario a la página de detalles del Pokémon.
   */
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/pokemon/${searchTerm.toLowerCase().trim()}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-6 drop-shadow-lg">
        Bienvenido a la PokéDex
      </h1>
      <p className="text-lg md:text-xl text-gray-700 mb-8 text-center max-w-2xl">
        Busca tu Pokémon favorito por nombre o por número de ID.
      </p>

      <Form onSubmit={handleSearch} className="w-full max-w-md bg-white p-6 rounded-xl shadow-xl flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          name="pokemonSearch"
          placeholder="Ej: pikachu o 25"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg w-full"
          aria-label="Buscar Pokémon por nombre o ID"
        />
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-3 bg-red-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300 transform hover:scale-105"
        >
          Buscar
        </button>
      </Form>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">¡Explora el mundo Pokémon!</h2>
        <p className="text-gray-600">
          Encuentra información detallada sobre tus Pokémon favoritos, sus habilidades y ¡escucha sus característicos sonidos!
        </p>
      </div>
    </div>
  );
}
