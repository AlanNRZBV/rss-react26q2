import { describe, it, expect, beforeEach } from 'vitest';
import { usePokemonStore } from './store';
import {
  mockPokemon,
  mockPokemonDetailed,
} from '../test-utils/mocks/pokemonData';

describe('Pokemon Store', () => {
  beforeEach(() => {
    usePokemonStore.getState().actions.clearPokemons();
    usePokemonStore.getState().actions.clearDetails();
  });

  it('starts with an empty state', () => {
    const state = usePokemonStore.getState();
    expect(state.selectedPokemons).toEqual([]);
    expect(state.selectedDetails).toBeNull();
  });

  it('toggles pokemon selection', () => {
    const { togglePokemons } = usePokemonStore.getState().actions;

    togglePokemons(mockPokemon);
    expect(usePokemonStore.getState().selectedPokemons).toContainEqual(
      mockPokemon
    );

    togglePokemons(mockPokemon);
    expect(usePokemonStore.getState().selectedPokemons).not.toContainEqual(
      mockPokemon
    );
  });

  it('toggles details selection', () => {
    const { toggleDetails } = usePokemonStore.getState().actions;

    toggleDetails(mockPokemonDetailed);
    expect(usePokemonStore.getState().selectedDetails).toEqual(
      mockPokemonDetailed
    );

    toggleDetails(mockPokemonDetailed);
    expect(usePokemonStore.getState().selectedDetails).toBeNull();
  });

  it('clears all pokemons', () => {
    const { togglePokemons, clearPokemons } =
      usePokemonStore.getState().actions;

    togglePokemons(mockPokemon);
    expect(usePokemonStore.getState().selectedPokemons).toHaveLength(1);

    clearPokemons();
    expect(usePokemonStore.getState().selectedPokemons).toHaveLength(0);
  });

  it('clears details', () => {
    const { toggleDetails, clearDetails } = usePokemonStore.getState().actions;

    toggleDetails(mockPokemonDetailed);
    expect(usePokemonStore.getState().selectedDetails).not.toBeNull();

    clearDetails();
    expect(usePokemonStore.getState().selectedDetails).toBeNull();
  });
});
