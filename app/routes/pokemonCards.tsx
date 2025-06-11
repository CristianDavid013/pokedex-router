// app/routes/pokemonCard.tsx
import React from 'react'
import { useLoaderData, Link } from 'react-router-dom'

export async function loader({ params }: { params: any }) {
  const { id } = params
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

  if (!res.ok) {
    throw new Response("No se pudo cargar el pokémon", { status: res.status })
  }

  const data = await res.json()
  return data
}

export default function PokemonCard() {
  const pokemonData = useLoaderData() as any

  if (!pokemonData) {
    return <h1>Cargando pokemon...</h1>
  }

  const playCry = () => {
    const audio = new Audio(`/sounds/${pokemonData.id}.ogg`)
    audio.play()
  }

  const PokeballButton = () => (
    <button
      onClick={playCry}
      className="relative w-12 h-12 rounded-full border-[3px] border-black overflow-hidden shadow-md cursor-pointer hover:scale-110 transition-transform"
      title="Escuchar sonido"
    >
      <div className="absolute top-0 left-0 w-full h-1/2 bg-red-600" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white" />
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-black -translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white border-[2px] border-black rounded-full -translate-x-1/2 -translate-y-1/2 z-10" />
    </button>
  )

  return (
    <div className="flip-card w-full h-64 relative">
      <div className="flip-card-inner w-full h-full">
        <div className="flip-card-front bg-white rounded-lg p-4 shadow flex flex-col items-center justify-center relative">
          <Link to={`/pokemon/${pokemonData.id}`} className="flex flex-col items-center">
            <img
              src={pokemonData.sprites.front_default}
              alt={pokemonData.name}
              className="w-24 h-24 object-contain mb-2"
            />
            <h2 className="text-xl font-semibold capitalize">{pokemonData.name}</h2>
            <p>ID: {pokemonData.id}</p>
          </Link>
          <div className="absolute top-2 right-2">
            <PokeballButton />
          </div>
        </div>

        <div className="flip-card-back bg-blue-100 rounded-lg p-4 shadow flex flex-col items-center justify-center text-center relative">
          <h3 className="text-lg font-semibold mb-2">Habilidades</h3>
          <ul className="list-disc list-inside">
            {pokemonData.abilities.map((hab: any, i: number) => (
              <li key={i}>{hab.ability.name}</li>
            ))}
          </ul>
          <div className="absolute top-2 right-2">
            <PokeballButton />
          </div>
        </div>
      </div>
    </div>
  )
}
