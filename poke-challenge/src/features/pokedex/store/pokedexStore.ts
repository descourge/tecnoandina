import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Pokemon } from '../api/pokemonApi'; // Importamos el tipo

// Define el tipo para el estado
interface PokemonState {
  // Estado de la UI
  pokemonList: Pokemon[];
  selectedColor: string | null;
  sortOrder: 'asc' | 'desc';

  // Estado persistido
  dynamicFields: Record<number, string>; // { [pokemonId]: "apodo" }

  // Acciones
  setPokemonList: (pokemon: Pokemon[]) => void;
  setSelectedColor: (color: string | null) => void;
  toggleSortOrder: () => void;
  
  // Acciones para la tabla
  deletePokemon: (pokemonId: number) => void;
  editPokemonName: (pokemonId: number, newName: string) => void;
  
  // Acciones para el campo dinámico (persistido)
  setDynamicField: (pokemonId: number, value: string) => void;
}

// Creamos el store
export const usePokemonStore = create<PokemonState>()(
  // Usamos el middleware 'persist'
  persist(
    (set) => ({
      // --- Valores por defecto ---
      pokemonList: [],
      selectedColor: null,
      sortOrder: 'asc',
      dynamicFields: {},

      // --- Acciones ---
      setPokemonList: (pokemon) => set({ pokemonList: pokemon }),

      setSelectedColor: (color) => set({ selectedColor: color }),

      toggleSortOrder: () =>
        set((state) => ({
          sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc',
        })),

      deletePokemon: (pokemonId) =>
        set((state) => ({
          pokemonList: state.pokemonList.filter((p) => p.id !== pokemonId),
        })),

      editPokemonName: (pokemonId, newName) =>
        set((state) => ({
          pokemonList: state.pokemonList.map((p) =>
            p.id === pokemonId ? { ...p, name: newName } : p
          ),
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
      // Opciones de 'persist'
      name: 'pokemon-dynamic-storage', // Nombre de la clave en localStorage
      // Solo persistimos el campo 'dynamicFields'
      partialize: (state) => ({ dynamicFields: state.dynamicFields }),
    }
  )
);