import React from 'react';
import { usePokemonStore } from '../store/pokedexStore';

export const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = usePokemonStore();

  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-input"
        placeholder="Buscar por nombre o tipo..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};