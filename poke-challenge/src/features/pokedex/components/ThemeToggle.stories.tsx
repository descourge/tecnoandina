import type { Meta, StoryObj } from '@storybook/react';
import { ThemeToggle } from './ThemeToggle';
import { usePokemonStore } from '../store/pokedexStore';
import React, { useEffect } from 'react';

// --- 1. Story Metadata ---
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
  
  // --- 2. The Reactive Decorator ---
  decorators: [
    (Story) => {
      // This is now REACTIVE. It subscribes to the store.
      const theme = usePokemonStore((state) => state.theme);
      
      // This effect re-runs whenever 'theme' changes in the store
      useEffect(() => {
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(theme);
      }, [theme]);

      // When the component (Story) is clicked, it will
      // update the store, which will trigger the effect above.
      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// --- 3. A Single, Interactive Story ---

/**
 * This is the default, interactive toggle. 
 * Click the icon to change the theme of the Storybook canvas.
 */
export const Interactive: Story = {
  // No args are needed, the component manages its own state
  // via the Zustand store.
  args: {},
};