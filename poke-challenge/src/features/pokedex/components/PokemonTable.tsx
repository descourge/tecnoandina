import React, { useEffect, useMemo } from 'react';
import { usePokemonList } from '../api/pokemonApi';
import { usePokemonStore } from '../store/pokedexStore';
import { PokemonRow } from './PokemonRow';
import {
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group';
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from 'react-icons/ai';
import { PokemonTableSkeleton } from './PokemonTableSkeleton';

// --- CAMBIO 1: Quitamos 'export' de esta línea ---
const PokemonTable = () => {
  // 1. Hooks (Query y Store)
  const { data: allPokemon, isLoading, error } = usePokemonList();
  const {
    pokemonList,
    setPokemonList,
    selectedColor,
    sortOrder,
    toggleSortOrder,
    searchQuery,
  } = usePokemonStore();

  // 2. Sincronización
  useEffect(() => {
    if (allPokemon) {
      setPokemonList(allPokemon);
    }
  }, [allPokemon, setPokemonList]);

  // 3. Filtrado y Ordenamiento
  const sortedPokemon = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    // 1. FILTRAR la lista
    const filteredList = pokemonList.filter((pokemon) => {
      if (query === '') return true;

      // Buscar por nombre
      if (pokemon.name.toLowerCase().includes(query)) {
        return true;
      }
      // Buscar por tipo
      if (pokemon.types.some((type) => type.toLowerCase().includes(query))) {
        return true;
      }
      return false;
    });

    // 2. ORDENAR la lista filtrada
    const sorted = [...filteredList].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    if (sortOrder === 'desc') {
      sorted.reverse();
    }
    return sorted;
  }, [pokemonList, sortOrder, searchQuery]);

  // 4. Estados de Carga
  if (isLoading) return <PokemonTableSkeleton />;
  if (error) return (
    <div>
      <span role="status" aria-live="polite" className="sr-only">
        Error al cargar los datos.
      </span>
      <p>Error: {error.message}</p>
    </div>
  );

  // Texto para el anunciador ARIA
  const resultsText =
    searchQuery.length > 0
      ? `${sortedPokemon.length} Pokémon encontrados.`
      : 'Mostrando los 30 Pokémon iniciales.';

  // 5. Renderizado
  return (
    <div>
      <span role="status" aria-live="polite" className="sr-only">
        {resultsText}
      </span>

      <div className="table-container">
        <table>
          <thead
            className="pokedex-header"
            style={
              {
                '--header-color': selectedColor ?? '#DB3535',
              } as React.CSSProperties
            }
          >
            <tr>
              <th>Imagen</th>
              <th>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                  }}
                >
                  Nombre{' '}
                  <button
                    className="icon-button sort"
                    onClick={toggleSortOrder}
                    aria-label="Ordenar por nombre"
                  >
                    {sortOrder === 'asc' ? (
                      <AiOutlineSortAscending />
                    ) : (
                      <AiOutlineSortDescending />
                    )}
                  </button>
                </div>
              </th>
              <th>Tipo(s)</th>
              <th>Experiencia</th>
              <th>Altura</th>
              <th>Peso</th>
              <th>Campo Dinámico</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <TransitionGroup component="tbody">
            {sortedPokemon.map((pokemon) => {
              const nodeRef = React.createRef<HTMLTableRowElement>();

              return (
                <CSSTransition
                  key={pokemon.id}
                  nodeRef={nodeRef}
                  timeout={500}
                  classNames="pokemon-row-transition"
                  unmountOnExit
                  appear
                >
                  <PokemonRow ref={nodeRef} pokemon={pokemon} />
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </table>
      </div>
    </div>
  );
};

// --- CAMBIO 2: Añadimos el 'export default' al final ---
export default PokemonTable;