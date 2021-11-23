// Render as you fetch
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
  PokemonErrorBoundary,
} from '../pokemon'
import {createResource} from '../utils'

function PokemonInfo({pokemonResource}) {
  const pokemon = pokemonResource.read()

  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')
  const [pokemonResource, setPokemonResource] = React.useState()

  React.useEffect(() => {
    if (pokemonName) {
      setPokemonResource(createResource(fetchPokemon(pokemonName)))
    } else {
      setPokemonResource(null)
    }
  }, [pokemonName])

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        {pokemonResource ? (
          <React.Suspense fallback={<PokemonInfoFallback name={pokemonName} />}>
            <PokemonErrorBoundary
              resetKeys={[pokemonResource]}
              onReset={handleReset}
            >
              <PokemonInfo pokemonResource={pokemonResource} />
            </PokemonErrorBoundary>
          </React.Suspense>
        ) : (
          'Submit a pokemon'
        )}
      </div>
    </div>
  )
}

export default App
