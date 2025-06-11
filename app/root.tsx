import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';

/**
 * Loader para obtener los datos de un Pokémon desde la PokeAPI.
 * Se activa cuando la ruta '/pokemon/:id' es accedida.
 * @param {object} params - Parámetros de la ruta, contiene el 'id' o 'nombre' del Pokémon.
 * @returns {Promise<object>} Los datos del Pokémon.
 * @throws {Response} Si el Pokémon no se puede cargar (ej. 404).
 */
export async function loader({ params }: { params: any }) {
  const { id } = params;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  if (!res.ok) {
    // Si la respuesta no es exitosa, lanza una Response para que ErrorBoundary la capture
    throw new Response(`No se pudo cargar el Pokémon: ${id}`, { status: res.status });
  }

  const data = await res.json();
  return data;
}

/**
 * Componente que muestra los detalles de un Pokémon.
 * Incluye una tarjeta con información, un botón para escuchar su sonido
 * y un efecto "flip" al pasar el ratón.
 */
export default function PokemonCard() {
  const pokemonData = useLoaderData() as any;

  if (!pokemonData) {
    // Esto debería ser manejado por HydrateFallback o ErrorBoundary si el loader falla
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-lg text-gray-700">Cargando Pokémon...</p>
      </div>
    );
  }

  /**
   * Reproduce el sonido característico del Pokémon.
   * Se espera que los archivos de sonido estén en `/public/sounds/{id}.ogg`.
   */
  const playCry = () => {
    // Asegúrate de que el ID del Pokémon coincida con el nombre del archivo de sonido.
    // PokeAPI proporciona un ID numérico que es bueno para esto.
    const audio = new Audio(`/sounds/${pokemonData.id}.ogg`);
    audio.play().catch(e => console.error("Error al reproducir el sonido:", e));
  };

  /**
   * Componente del botón Pokeball.
   */
  const PokeballButton = () => (
    <button
      onClick={playCry}
      className="relative w-12 h-12 rounded-full border-[3px] border-black overflow-hidden shadow-md cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out z-10
                 flex items-center justify-center p-0 bg-gradient-to-br from-gray-300 to-gray-50"
      title="Escuchar sonido del Pokémon"
    >
      {/* Mitad superior roja */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-red-600"></div>
      {/* Mitad inferior blanca */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white"></div>
      {/* Línea divisoria negra */}
      <div className="absolute top-1/2 left-0 w-full h-[4px] bg-black -translate-y-1/2"></div>
      {/* Círculo central blanco con borde negro */}
      <div className="absolute top-1/2 left-1/2 w-5 h-5 bg-white border-[3px] border-black rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      {/* Círculo pequeño interior negro */}
      <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-black rounded-full -translate-x-1/2 -translate-y-1/2 z-20"></div>
    </button>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-4">
      <Link to="/" className="absolute top-4 left-4 p-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414L7.5 9.086V7a1 1 0 00-2 0v4a1 1 0 001 1h4a1 1 0 000-2h-2.586l1.293-1.293z" clipRule="evenodd" />
        </svg>
        <span>Volver a la búsqueda</span>
      </Link>

      <div className="flip-card w-full max-w-sm h-96 relative mx-auto my-8">
        <div className="flip-card-inner w-full h-full">
          {/* Frente de la tarjeta (información básica) */}
          <div className="flip-card-front bg-white rounded-lg p-4 shadow flex flex-col items-center justify-around">
            <h2 className="text-3xl font-extrabold capitalize text-gray-800 mb-2">{pokemonData.name}</h2>
            <p className="text-xl text-gray-600 mb-4">ID: <span className="font-semibold">{pokemonData.id}</span></p>
            <img
              src={pokemonData.sprites.other['official-artwork'].front_default || pokemonData.sprites.front_default}
              alt={pokemonData.name}
              className="w-32 h-32 md:w-48 md:h-48 object-contain mb-4 filter drop-shadow-lg"
              // Fallback en caso de que la imagen no cargue
              onError={(e: any) => { e.target.onerror = null; e.target.src="https://placehold.co/192x192/E2E8F0/1A202C?text=No+Image"; }}
            />
            <div className="flex space-x-2 mt-2">
              {pokemonData.types.map((typeInfo: any, i: number) => (
                <span
                  key={i}
                  className={`px-3 py-1 rounded-full text-sm font-semibold
                    ${typeInfo.type.name === 'grass' ? 'bg-green-200 text-green-800' :
                      typeInfo.type.name === 'fire' ? 'bg-red-200 text-red-800' :
                      typeInfo.type.name === 'water' ? 'bg-blue-200 text-blue-800' :
                      typeInfo.type.name === 'bug' ? 'bg-lime-200 text-lime-800' :
                      typeInfo.type.name === 'normal' ? 'bg-gray-200 text-gray-800' :
                      typeInfo.type.name === 'electric' ? 'bg-yellow-200 text-yellow-800' :
                      typeInfo.type.name === 'poison' ? 'bg-purple-200 text-purple-800' :
                      'bg-gray-200 text-gray-800' // Default
                    }`}
                >
                  {typeInfo.type.name}
                </span>
              ))}
            </div>
            <div className="absolute bottom-4 right-4">
              <PokeballButton />
            </div>
          </div>

          {/* Dorso de la tarjeta (detalles y habilidades) */}
          <div className="flip-card-back bg-blue-100 rounded-lg p-4 shadow flex flex-col items-center justify-around">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">Detalles y Habilidades</h3>
            <div className="grid grid-cols-2 gap-4 text-gray-700 w-full max-w-xs">
              <p className="font-semibold">Altura:</p>
              <p>{pokemonData.height / 10} m</p>
              <p className="font-semibold">Peso:</p>
              <p>{pokemonData.weight / 10} kg</p>
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Habilidades:</h4>
            <ul className="list-disc list-inside text-gray-700 max-h-24 overflow-y-auto">
              {pokemonData.abilities.map((hab: any, i: number) => (
                <li key={i} className="capitalize text-lg">{hab.ability.name}</li>
              ))}
            </ul>
            <div className="absolute bottom-4 right-4">
              <PokeballButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}