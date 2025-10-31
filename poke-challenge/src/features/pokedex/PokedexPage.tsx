import React, { useEffect, useRef, useState } from 'react';
// --- NUEVA IMPORTACIÓN ---
import { PokemonTableSkeleton } from './components/PokemonTableSkeleton';
// -----------------------
import { PokemonTable } from './components/PokemonTable';
import { ThemeToggle } from './components/ThemeToggle';
import { EditModal } from './components/EditModal';
import { usePokemonStore } from './store/pokedexStore';

const PokedexPage: React.FC = () => {
  const theme = usePokemonStore((state) => state.theme);
  
  // Lógica de Lazy Loading (sin cambios)
  const [isTableVisible, setIsTableVisible] = useState(false);
  const tableTriggerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTableVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '100px' }
    );

    if (tableTriggerRef.current) {
      observer.observe(tableTriggerRef.current);
    }

    return () => {
      if (tableTriggerRef.current) {
        observer.unobserve(tableTriggerRef.current);
      }
    };
  }, []);
  
  // Effect para el tema (sin cambios)
  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <div className="app-container" style={{ padding: '20px' }}>
      <header className="site-header">
        <h1>PokéChallenge</h1>
        <ThemeToggle />
      </header>

      <p>Explora la lista de Pokémon.</p>
      
      {/* --- CAMBIO AQUÍ --- */}
      <div ref={tableTriggerRef}>
        {isTableVisible ? (
          <PokemonTable />
        ) : (
          // Reemplazamos el placeholder por el skeleton
          <PokemonTableSkeleton />
        )}
      </div>
      {/* --- FIN DEL CAMBIO --- */}
      
      <EditModal />
    </div>
  );
};

export default PokedexPage;