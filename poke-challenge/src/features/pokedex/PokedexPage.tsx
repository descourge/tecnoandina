import React, { 
  useEffect, 
  useRef, 
  useState, 
  Suspense,
  lazy
} from 'react';

import { PokemonTableSkeleton } from './components/PokemonTableSkeleton';
import { ThemeToggle } from './components/ThemeToggle';
import { EditModal } from './components/EditModal';
import { SearchBar } from './components/SearchBar';
import { usePokemonStore } from './store/pokedexStore';

const PokemonTable = lazy(() => import('./components/PokemonTable'));

const PokedexPage: React.FC = () => {
  const theme = usePokemonStore((state) => state.theme);
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
        
        <div ref={tableTriggerRef}>
          <Suspense fallback={<PokemonTableSkeleton />}>
            {isTableVisible ? (
              <PokemonTable />
            ) : (
              <PokemonTableSkeleton />
            )}
          </Suspense>
        </div>
        
      </main>
      
      <EditModal />
    </div>
  );
};

export default PokedexPage;