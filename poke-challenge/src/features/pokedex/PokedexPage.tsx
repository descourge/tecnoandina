// src/features/pokedex/PokedexPage.tsx

import React from 'react';
import { PokemonTable } from './components/PokemonTable';

// Este es el componente "página" que envuelve tu tabla
const PokedexPage: React.FC = () => {
  return (
    <div className="pokedex-page-container" style={{ padding: '20px' }}>
      <h1>PokéChallenge</h1>
      <p>Explora la lista de Pokémon.</p>
      
      {/* Aquí renderizamos la tabla que ya creamos */}
      <PokemonTable />
    </div>
  );
};

// La clave está aquí. Elige UNA de estas dos formas de exportar:

// Opción A: Exportación por defecto (Recomendada para páginas)
export default PokedexPage;

// Opción B: Exportación por nombre
// export const PokedexPage = () => { ... };