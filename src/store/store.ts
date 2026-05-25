import { create } from 'zustand/react';

type PokemonStoreState = {
  selectedPokemons: string[];
  selectedDetails: string | null;
  actions: {
    clearPokemons: () => void;
    clearDetails: () => void;
    togglePokemons: (id: string) => void;
    toggleDetails: (id: string) => void;
  };
};

export const usePokemonStore = create<PokemonStoreState>()((set) => ({
  selectedPokemons: [],
  selectedDetails: null,
  actions: {
    clearPokemons: () => set({ selectedPokemons: [] }),
    clearDetails: () => set({ selectedDetails: null }),
    togglePokemons: (id: string) =>
      set((state) => {
        const isSelected = state.selectedPokemons.includes(id);
        return {
          selectedPokemons: isSelected
            ? state.selectedPokemons.filter((newId) => newId !== id)
            : [...state.selectedPokemons, id],
        };
      }),
    toggleDetails: (id) =>
      set((state) => ({
        selectedDetails: state.selectedDetails === id ? null : id,
      })),
  },
}));

export const useSelectedPokemons = () =>
  usePokemonStore((state) => state.selectedPokemons);
export const useSelectedDetails = () =>
  usePokemonStore((state) => state.selectedDetails);
export const usePokemonActions = () =>
  usePokemonStore((state) => state.actions);
