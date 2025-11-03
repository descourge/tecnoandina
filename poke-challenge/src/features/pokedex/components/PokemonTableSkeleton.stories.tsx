import type { Meta, StoryObj } from '@storybook/react';
import { PokemonTableSkeleton } from './PokemonTableSkeleton';
import { useEffect } from 'react';

const meta: Meta<typeof PokemonTableSkeleton> = {
  title: 'Pokedex/Components/PokemonTableSkeleton',
  component: PokemonTableSkeleton,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The loading skeleton shown while the table data is being fetched.'
      }
    }
  },
  decorators: [
    (Story, context) => {
      const { theme } = context.args as { theme: 'light' | 'dark' };
      useEffect(() => {
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(theme);
      }, [theme]);
      
      return (
        <div style={{ padding: '2rem' }}>
          <Story />
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightTheme: Story = {
  args: {
    theme: 'light',
  },
};

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
  },
};