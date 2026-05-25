import { create } from 'zustand/react';
import type { PokemonCardData, PokemonDetailedData } from '../types/types.ts';

type PokemonStoreState = {
  selectedPokemons: PokemonCardData[];
  selectedDetails: PokemonDetailedData | null;
  actions: {
    clearPokemons: () => void;
    clearDetails: () => void;
    togglePokemons: (pokemon: PokemonCardData) => void;
    toggleDetails: (pokemon: PokemonDetailedData) => void;
  };
};

export const usePokemonStore = create<PokemonStoreState>()((set) => ({
  selectedPokemons: [],
  selectedDetails: null,
  actions: {
    clearPokemons: () => set({ selectedPokemons: [] }),
    clearDetails: () => set({ selectedDetails: null }),
    togglePokemons: (pokemon) =>
      set((state) => {
        const isSelected = state.selectedPokemons.some(
          (p) => p.id === pokemon.id
        );
        return {
          selectedPokemons: isSelected
            ? state.selectedPokemons.filter((p) => p.id !== pokemon.id)
            : [...state.selectedPokemons, pokemon],
        };
      }),
    toggleDetails: (pokemon) =>
      set((state) => ({
        selectedDetails:
          state.selectedDetails?.id === pokemon.id ? null : pokemon,
      })),
  },
}));

export const useSelectedPokemons = () =>
  usePokemonStore((state) => state.selectedPokemons);
export const useSelectedDetails = () =>
  usePokemonStore((state) => state.selectedDetails);
export const usePokemonActions = () =>
  usePokemonStore((state) => state.actions);
