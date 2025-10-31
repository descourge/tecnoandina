import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Pokemon } from '../api/pokemonApi'; // Importamos el tipo

// Define el tipo para el estado
interface PokemonState {
  // Estado de la UI
  pokemonList: Pokemon[];
  selectedColor: string | null;
  sortOrder: 'asc' | 'desc';
  theme: 'light' | 'dark';
  editingPokemon: Pokemon | null; // <-- NUEVO ESTADO

  // Estado persistido
  dynamicFields: Record<number, string>;

  // Acciones
  setPokemonList: (pokemon: Pokemon[]) => void;
  setSelectedColor: (color: string | null) => void;
  toggleSortOrder: () => void;
  toggleTheme: () => void;
  openEditModal: (pokemon: Pokemon) => void; // <-- NUEVA ACCIÓN
  closeEditModal: () => void; // <-- NUEVA ACCIÓN
  
  // Acciones para la tabla
  deletePokemon: (pokemonId: number) => void;
  editPokemonName: (pokemonId: number, newName: string) => void;
  
  // Acciones para el campo dinámico
  setDynamicField: (pokemonId: number, value: string) => void;
}

// Creamos el store
export const usePokemonStore = create<PokemonState>()(
  persist(
    (set) => ({
      // --- Valores por defecto ---
      pokemonList: [],
      selectedColor: null,
      sortOrder: 'asc',
      dynamicFields: {},
      theme: 'light',
      editingPokemon: null, // <-- VALOR INICIAL

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

      // --- NUEVAS ACCIONES IMPLEMENTADAS ---
      openEditModal: (pokemon) => set({ editingPokemon: pokemon }),
      closeEditModal: () => set({ editingPokemon: null }),
      // ------------------------------------

      deletePokemon: (pokemonId) =>
        set((state) => ({
          pokemonList: state.pokemonList.filter((p) => p.id !== pokemonId),
        })),

      editPokemonName: (pokemonId, newName) =>
        set((state) => ({
          // Actualizamos la lista principal
          pokemonList: state.pokemonList.map((p) =>
            p.id === pokemonId ? { ...p, name: newName } : p
          ),
          // Y también el Pokémon que se está editando (para que se actualice en el modal)
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