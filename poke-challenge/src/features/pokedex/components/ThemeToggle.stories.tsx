import type { Meta, StoryObj } from '@storybook/react';
import { ThemeToggle } from './ThemeToggle';
import { usePokemonStore } from '../store/pokedexStore';
import { useEffect } from 'react';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Pokedex/Components/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The interactive switch for changing between light and dark themes.'
      }
    }
  },

  decorators: [
    (Story) => {
      const theme = usePokemonStore((state) => state.theme);
    
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

export const Interactivo: Story = {
  args: {},
};