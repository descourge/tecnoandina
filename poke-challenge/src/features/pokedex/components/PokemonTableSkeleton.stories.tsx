import type { Meta, StoryObj } from '@storybook/react';
import { PokemonTableSkeleton } from './PokemonTableSkeleton';
import React, { useEffect } from 'react';

// --- 1. Story Metadata ---
const meta: Meta<typeof PokemonTableSkeleton> = {
  title: 'Pokedex/Components/PokemonTableSkeleton',
  component: PokemonTableSkeleton,
  parameters: {
    // We don't use 'centered' here, we want it to be full width
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The loading skeleton shown while the table data is being fetched.'
      }
    }
  },
  decorators: [
    (Story, context) => {
      // Get the theme from the story args
      const { theme } = context.args as { theme: 'light' | 'dark' };

      // Set the theme on the body
      useEffect(() => {
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(theme);
      }, [theme]);
      
      // Add some padding so it's not glued to the edge
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

// --- 2. Stories ---

/**
 * The skeleton as it appears in Light Theme.
 */
export const LightTheme: Story = {
  args: {
    theme: 'light',
  },
};

/**
 * The skeleton as it appears in Dark Theme.
 */
export const DarkTheme: Story = {
  args: {
    theme: 'dark',
  },
};