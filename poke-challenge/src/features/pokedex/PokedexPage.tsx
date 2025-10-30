import React, { useEffect } from 'react';
import { PokemonTable } from './components/PokemonTable';
import { ThemeToggle } from './components/ThemeToggle'; // <-- IMPORTAR TOGGLE
import { usePokemonStore } from './store/pokedexStore'; // <-- IMPORTAR STORE

const PokedexPage: React.FC = () => {
  // --- LÓGICA DEL TEMA ---
  // Obtenemos el tema del store
  const theme = usePokemonStore((state) => state.theme);

  // Este Effect aplica el tema a todo el sitio
  useEffect(() => {
    // Limpiamos clases anteriores
    document.body.classList.remove('light', 'dark');
    // Añadimos la clase actual
    document.body.classList.add(theme);
  }, [theme]); // Se ejecuta cada vez que 'theme' cambia
  // --- FIN LÓGICA TEMA ---

  return (
    // Este es tu contenedor principal
    <div className="app-container" style={{ padding: '20px' }}>
      
      {/* --- NUEVO HEADER --- */}
      <header className="site-header">
        <h1>PokéChallenge</h1>
        <ThemeToggle />
      </header>
      {/* --- FIN HEADER --- */}

      <p>Explora la lista de Pokémon.</p>
      
      <PokemonTable />
    </div>
  );
};

export default PokedexPage;