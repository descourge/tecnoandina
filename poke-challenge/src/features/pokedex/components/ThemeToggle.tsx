import React from 'react';
import { usePokemonStore } from '../store/pokedexStore';

export const ThemeToggle: React.FC = () => {
  // Leemos el tema actual y la acción del store
  const { theme, toggleTheme } = usePokemonStore();

  // Determinamos qué icono mostrar
  const iconSrc = theme === 'light' ? '/solrock.png' : '/lunatone.png';

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro'}
    >
      <img src={iconSrc} alt={`${theme} theme icon`} />
    </button>
  );
};