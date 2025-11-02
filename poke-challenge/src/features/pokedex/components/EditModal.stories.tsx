import type { Meta, StoryObj } from '@storybook/react';
import { EditModal } from './EditModal';
import { usePokemonStore } from '../store/pokedexStore';
import React, { useEffect } from 'react';
import type { Pokemon } from '../api/pokemonApi';

// --- (Mock Data) ---
const mockPokemon: Pokemon = {
  id: 1,
  name: 'bulbasaur',
  imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
  experience: 64,
  height: 7,
  weight: 69,
  types: ['grass', 'poison'],
  color: 'green',
};

// --- (Metadata) ---
const meta: Meta<typeof EditModal> = {
  title: 'Pokedex/Components/EditModal',
  component: EditModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The modal used to edit a Pokémon\'s name. It relies on the `usePokemonStore` to know which Pokémon is being edited.'
      }
    }
  },
  
  // --- (Decorator) ---
  decorators: [
    (Story, context) => {
      const { theme, pokemonToEdit, nickname } = context.args as {
        theme: 'light' | 'dark';
        pokemonToEdit: Pokemon | null;
        nickname: string | null;
      };

      useEffect(() => {
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(theme);
      }, [theme]);

      useEffect(() => {
        const dynamicFieldsForStory: Record<number, string> = {};
        if (pokemonToEdit && nickname) {
          dynamicFieldsForStory[pokemonToEdit.id] = nickname;
        }

        usePokemonStore.setState({
          theme: theme,
          editingPokemon: pokemonToEdit,
          dynamicFields: dynamicFieldsForStory,
        });
      }, [theme, pokemonToEdit, nickname]);
      
      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// --- 4. Stories ---

/**
 * The modal in its default state (no nickname) in Light Theme.
 */
export const DefaultLight: Story = {
  args: {
    theme: 'light',
    pokemonToEdit: mockPokemon,
    nickname: null,
  },
};

/**
 * The modal in its default state (no nickname) in Dark Theme.
 */
export const DefaultDark: Story = {
  args: {
    theme: 'dark',
    pokemonToEdit: mockPokemon,
    nickname: null,
  },
};

/**
 * The modal editing a Pokémon that *does* have a
 * nickname ("mote") in Light Theme.
 */
export const WithNicknameLight: Story = {
  args: {
    theme: 'light',
    pokemonToEdit: mockPokemon,
    nickname: 'Bulby', // The nickname to display
  },
};

/**
 * The modal editing a Pokémon that *does* have a
 * nickname in Dark Theme.
 */
export const WithNicknameDark: Story = {
  args: {
    theme: 'dark',
    pokemonToEdit: mockPokemon,
    nickname: 'Bulby',
  },
};