import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from './SearchBar';
import { usePokemonStore } from '../store/pokedexStore';
import { useEffect } from 'react';

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
  decorators: [
    (Story, context) => {
      const { initialQuery, theme } = context.args as { initialQuery: string, theme: 'light' | 'dark' };
      useEffect(() => {
        usePokemonStore.setState({ searchQuery: initialQuery });
      }, [initialQuery]);

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

export const DefaultLight: Story = {
  args: {
    initialQuery: '',
    theme: 'light',
  },
};

export const DefaultDark: Story = {
  args: {
    initialQuery: '',
    theme: 'dark',
  },
};


export const ConTexto: Story = {
  args: {
    initialQuery: 'Pikachu',
    theme: 'light',
  },
};

export const ConTextoDark: Story = {
  args: {
    initialQuery: 'Charmander',
    theme: 'dark',
  },
};