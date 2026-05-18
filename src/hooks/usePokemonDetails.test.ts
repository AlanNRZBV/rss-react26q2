import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { usePokemonDetails } from './usePokemonDetails';
import { fetchPokemonById } from '../api/pokemons';
import { mockPokemonDetailed } from '../test-utils/mocks/pokemonData';

vi.mock('../api/pokemons', () => ({
  fetchPokemonById: vi.fn(),
}));

describe('usePokemonDetails Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Initializes with loading false and no data', () => {
    const { result } = renderHook(() => usePokemonDetails(''));
    expect(result.current.loading).toBe(false);
    expect(result.current.pokemon).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('Fetches pokemon data successfully', async () => {
    vi.mocked(fetchPokemonById).mockResolvedValue(mockPokemonDetailed);

    const { result } = renderHook(() => usePokemonDetails('1'));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.pokemon).toEqual(mockPokemonDetailed);
    expect(result.current.error).toBeNull();
  });

  it('Handles fetch error correctly', async () => {
    const errorMessage = 'Failed to fetch';
    vi.mocked(fetchPokemonById).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => usePokemonDetails('1'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.pokemon).toBeNull();
    expect(result.current.error).toBe(errorMessage);
  });
});
