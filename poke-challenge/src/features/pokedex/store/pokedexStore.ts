import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Pokemon } from '../api/pokemonApi';

interface PokemonState {
  // Estado de la UI
  pokemonList: Pokemon[];
  selectedColor: string | null;
  sortOrder: 'asc' | 'desc';
  theme: 'light' | 'dark';
  editingPokemon: Pokemon | null;
  searchQuery: string;

  dynamicFields: Record<number, string>;

  // Acciones
  setPokemonList: (pokemon: Pokemon[]) => void;
  setSelectedColor: (color: string | null) => void;
  toggleSortOrder: () => void;
  toggleTheme: () => void;
  openEditModal: (pokemon: Pokemon) => void;
  closeEditModal: () => void;
  setSearchQuery: (query: string) => void;
  
  // Acciones para la tabla
  deletePokemon: (pokemonId: number) => void;
  editPokemonName: (pokemonId: number, newName: string) => void;
  
  // Acción para el campo dinámico
  setDynamicField: (pokemonId: number, value: string) => void;
}

// Store
export const usePokemonStore = create<PokemonState>()(
  persist(
    (set) => ({
      pokemonList: [],
      selectedColor: null,
      sortOrder: 'asc',
      dynamicFields: {},
      theme: 'light',
      editingPokemon: null,
      searchQuery: '',

      // --- Acciones ---
      setPokemonList: (pokemon) => set({ pokemonList: pokemon }),
      setSelectedColor: (color) => set({ selectedColor: color }),
      toggleSortOrder: () =>
        set((state) => ({
          sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc',
        })),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),

      openEditModal: (pokemon) => set({ editingPokemon: pokemon }),
      closeEditModal: () => set({ editingPokemon: null }),

      setSearchQuery: (query) => set({ searchQuery: query }),

      deletePokemon: (pokemonId) =>
        set((state) => ({
          pokemonList: state.pokemonList.filter((p) => p.id !== pokemonId),
        })),

      editPokemonName: (pokemonId, newName) =>
        set((state) => ({
          pokemonList: state.pokemonList.map((p) =>
            p.id === pokemonId ? { ...p, name: newName } : p
          ),
          editingPokemon:
            state.editingPokemon && state.editingPokemon.id === pokemonId
              ? { ...state.editingPokemon, name: newName }
              : state.editingPokemon,
        })),

      setDynamicField: (pokemonId, value) =>
        set((state) => ({
          dynamicFields: {
            ...state.dynamicFields,
            [pokemonId]: value,
          },
        })),
    }),
    {
      name: 'pokemon-dynamic-storage',
      partialize: (state) => ({
        dynamicFields: state.dynamicFields,
        theme: state.theme,
      }),
    }
  )
);