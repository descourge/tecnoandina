import React, { 
  useEffect, 
  useRef, 
  useState, 
  Suspense, // <-- 1. Importar Suspense
  lazy      // <-- 2. Importar lazy
} from 'react';

// --- 3. Rutas correctas (las que tú tenías) ---
import { PokemonTableSkeleton } from './components/PokemonTableSkeleton';
// import { PokemonTable } from './components/PokemonTable'; // <-- 4. Comentar la importación directa
import { ThemeToggle } from './components/ThemeToggle';
import { EditModal } from './components/EditModal';
import { SearchBar } from './components/SearchBar';
import { usePokemonStore } from './store/pokedexStore';

// --- 5. CREAR la importación "lazy" con la ruta correcta ---
const PokemonTable = lazy(() => import('./components/PokemonTable'));
// ------------------------------------

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
      
      <header className="site-header" role="banner">
        <div className="header-top-row">
          <div className="logo-container">
            <img src="/pokeball.png" alt="Pokeball" className="logo-icon" />
            <h1>PokéChallenge</h1>
          </div>
          <ThemeToggle />
        </div>
        
        <div className="header-bottom-row">
          <div role="search">
            <SearchBar />
          </div>
        </div>
      </header>
      
      <main role="main">
        
        {/* --- 6. APLICAR EL CAMBIO --- */}
        <div ref={tableTriggerRef}>
          {/*
            Suspense mostrará el 'fallback' (el skeleton)
            mientras el código de PokemonTable.tsx se descarga.
          */}
          <Suspense fallback={<PokemonTableSkeleton />}>
            {isTableVisible ? (
              <PokemonTable /> // <-- Ahora es cargado perezosamente
            ) : (
              <PokemonTableSkeleton />
            )}
          </Suspense>
        </div>
        {/* --- FIN DEL CAMBIO --- */}
        
      </main>
      
      <EditModal />
    </div>
  );
};

export default PokedexPage;