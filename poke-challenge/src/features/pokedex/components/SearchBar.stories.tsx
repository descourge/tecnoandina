import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from './SearchBar';
import { usePokemonStore } from '../store/pokedexStore';
import React, { useEffect } from 'react';

// --- 1. Metadatos de la Historia ---
const meta: Meta<typeof SearchBar> = {
  title: 'Pokedex/Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'El campo de entrada para filtrar Pokémon por nombre o tipo.'
      }
    }
  },
  // Simulamos el store de Zustand
  decorators: [
    (Story, context) => {
      // Obtenemos el texto inicial y el tema de los args
      const { initialQuery, theme } = context.args as { initialQuery: string, theme: 'light' | 'dark' };

      // Seteamos el estado inicial de la búsqueda
      useEffect(() => {
        usePokemonStore.setState({ searchQuery: initialQuery });
      }, [initialQuery]);

      // Seteamos el tema para que el input se vea correcto
      useEffect(() => {
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(theme);
      }, [theme]);
      
      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// --- 2. Historias ---

/**
 * Estado por defecto, vacío, en tema claro.
 */
export const DefaultLight: Story = {
  args: {
    initialQuery: '',
    theme: 'light',
  },
};

/**
 * Estado por defecto, vacío, en tema oscuro.
 */
export const DefaultDark: Story = {
  args: {
    initialQuery: '',
    theme: 'dark',
  },
};

/**
 * Barra de búsqueda con texto ingresado por el usuario.
 */
export const WithText: Story = {
  args: {
    initialQuery: 'Pikachu',
    theme: 'light',
  },
};

/**
 * Barra de búsqueda con texto en tema oscuro.
 */
export const WithTextDark: Story = {
  args: {
    initialQuery: 'Charmander',
    theme: 'dark',
  },
};