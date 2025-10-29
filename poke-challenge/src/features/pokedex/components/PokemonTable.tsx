import { useEffect, useMemo } from 'react';
// CAMBIO: Importamos el nuevo hook
import { usePokemonList } from '../api/pokemonApi';
import { usePokemonStore } from '../store/pokedexStore';
import { PokemonRow } from './PokemonRow';

export const PokemonTable = () => {
  // --- 1. Hook de React Query (Simplificado) ---
  // CAMBIO: Usamos el nuevo hook. No hay fetchNextPage, hasNextPage, etc.
  const { data: allPokemon, isLoading, error } = usePokemonList();

  // --- 2. Hook de Zustand ---
  const {
    pokemonList,
    setPokemonList,
    selectedColor,
    sortOrder,
    toggleSortOrder,
  } = usePokemonStore();

  // --- 3. Sincronización React Query -> Zustand ---
  // Ahora solo se ejecuta una vez cuando 'allPokemon' carga
  useEffect(() => {
    if (allPokemon) {
      setPokemonList(allPokemon);
    }
  }, [allPokemon, setPokemonList]); // Depende de 'allPokemon'

  // --- 4. Lógica de Ordenamiento ---
  // (No cambia, pero ahora opera sobre la lista de Zustand)
  const sortedPokemon = useMemo(() => {
    const sorted = [...pokemonList].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    if (sortOrder === 'desc') {
      sorted.reverse();
    }
    return sorted;
  }, [pokemonList, sortOrder]);

  // --- 5. Estados de Carga/Error ---
  // (No cambia)
  if (isLoading) return <p>Cargando Pokémon...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // --- 6. Renderizado ---
  return (
    <>
      <table>
        <thead className="pokedex-header" style={{ backgroundColor: selectedColor ?? 'transparent', transition: 'background-color 0.75s ease-out', }}>
          <tr>
            <th>Imagen</th>
            <th>
              Nombre{' '}
              <button onClick={toggleSortOrder}>
                ({sortOrder === 'asc' ? 'A-Z' : 'Z-A'})
              </button>
            </th>
            <th>Tipo(s)</th>
            <th>Experiencia</th>
            <th>Altura</th>
            <th>Peso</th>
            <th>Campo Dinámico</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapeamos sobre la lista ordenada de Zustand */}
          {sortedPokemon.map((pokemon) => (
            <PokemonRow key={pokemon.id} pokemon={pokemon} />
          ))}
        </tbody>
      </table>
      {/* ¡Ya no hay botón de "Cargar más" ni observer! */}
    </>
  );
};