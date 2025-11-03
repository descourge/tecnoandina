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

const PokemonTable = () => {
  const { data: allPokemon, isLoading, error } = usePokemonList();
  const {
    pokemonList,
    setPokemonList,
    selectedColor,
    sortOrder,
    toggleSortOrder,
    searchQuery,
  } = usePokemonStore();

  useEffect(() => {
    if (allPokemon) {
      setPokemonList(allPokemon);
    }
  }, [allPokemon, setPokemonList]);

  const sortedPokemon = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    const filteredList = pokemonList.filter((pokemon) => {
      if (query === '') return true;

      if (pokemon.name.toLowerCase().includes(query)) {
        return true;
      }
      if (pokemon.types.some((type) => type.toLowerCase().includes(query))) {
        return true;
      }
      return false;
    });

    const sorted = [...filteredList].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    if (sortOrder === 'desc') {
      sorted.reverse();
    }
    return sorted;
  }, [pokemonList, sortOrder, searchQuery]);

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

      {/* --- FOOTER --- */}
      <footer className="table-footer">
        <p className="footer-count">
          Mostrando <strong>{sortedPokemon.length}</strong> Pokémon
        </p>
        
        <hr className="footer-divider" />
        
        <p className="footer-info">
          Datos proporcionados por PokéAPI · Imágenes oficiales de Pokémon Company
        </p>
        <p className="footer-info">
          Pulsa una fila para cambiar el color del encabezado · Los nombres que terminan antes de 'm' están resaltados
        </p>
      </footer>
      {/* --- FIN DEL FOOTER --- */}
      
    </div>
  );
};
export default PokemonTable;