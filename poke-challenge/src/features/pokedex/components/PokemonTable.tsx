import React, { useEffect, useMemo } from 'react';
import { usePokemonList } from '../api/pokemonApi';
import { usePokemonStore } from '../store/pokedexStore';
import { PokemonRow } from './PokemonRow';
import {
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group';
// --- NUEVA IMPORTACIÓN ---
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from 'react-icons/ai';
import { PokemonTableSkeleton } from './PokemonTableSkeleton';

export const PokemonTable = () => {
  // 1. Hooks (Query y Store)
  const { data: allPokemon, isLoading, error } = usePokemonList();
  const {
    pokemonList,
    setPokemonList,
    selectedColor,
    sortOrder,
    toggleSortOrder,
  } = usePokemonStore();

  // 2. Sincronización
  useEffect(() => {
    if (allPokemon) {
      setPokemonList(allPokemon);
    }
  }, [allPokemon, setPokemonList]);

  // 3. Ordenamiento
  const sortedPokemon = useMemo(() => {
    const sorted = [...pokemonList].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    if (sortOrder === 'desc') {
      sorted.reverse();
    }
    return sorted;
  }, [pokemonList, sortOrder]);

  // 4. Estados de Carga
  if (isLoading) return <PokemonTableSkeleton />;
  if (error) return <p>Error: {error.message}</p>;

  // 5. Renderizado
  return (
    <>
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
                  alignItems: 'center', // Centra verticalmente
                  justifyContent: 'center', // Centra horizontalmente
                  gap: '4px', // Espacio entre texto e icono
                }}
              >
                Nombre{' '}
                {/* --- CAMBIO AQUÍ --- */}
                <button
                    className="icon-button sort" // Usamos la clase
                    onClick={toggleSortOrder}
                    aria-label="Ordenar por nombre"
                >
                    {/* Mostramos un icono u otro según el estado */}
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

        {/* El TransitionGroup envuelve el <tbody> */}
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
    </>
  );
};