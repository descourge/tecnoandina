import React from 'react';
import { usePokemonStore } from '../store/pokedexStore';

export const ThemeToggle: React.FC = () => {
  // Leemos el tema actual y la acción del store
  const { theme, toggleTheme } = usePokemonStore();

  const isDark = theme === 'dark';
  const iconSrc = isDark ? '/lunatone.png' : '/solrock.png';

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
    >
      <img src={iconSrc} alt={`${theme} theme icon`} />
    </button>
  );
};