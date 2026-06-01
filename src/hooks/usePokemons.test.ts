import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { usePokemons } from './usePokemons';
import { QueryClientWrapper } from '../test-utils/QueryClientWrapper';
import { baseApi } from '../api/instance.ts';
import {
  rawPokemonResponse,
  pokemonListApiResponse,
} from '../test-utils/mocks/pokemonData';

vi.mock('axios', async (importOriginal) => {
  const actual = await importOriginal<typeof axios>();
  return {
    ...actual,
    default: {
      get: vi.fn(),
      isAxiosError: actual.isAxiosError,
    },
    get: vi.fn(),
    isAxiosError: actual.isAxiosError,
  };
});

vi.mock('../api/instance', () => ({
  baseApi: {
    get: vi.fn(),
  },
}));

describe('usePokemons', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return pokemon list', async () => {
    vi.mocked(baseApi.get).mockResolvedValueOnce({
      data: {
        count: 100,
        results: pokemonListApiResponse.results,
      },
    });

    vi.mocked(axios.get).mockResolvedValue({
      data: rawPokemonResponse,
    });

    const { result } = renderHook(() => usePokemons('', 1), {
      wrapper: QueryClientWrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.results).toHaveLength(
      pokemonListApiResponse.results.length
    );
    expect(result.current.data?.total).toBe(100);
  });

  it('should return single pokemon when searchTerm is provided', async () => {
    vi.mocked(baseApi.get).mockResolvedValueOnce({
      data: rawPokemonResponse,
    });

    const { result } = renderHook(() => usePokemons('bulbasaur', 1), {
      wrapper: QueryClientWrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.results).toHaveLength(1);
    expect(result.current.data?.results[0].name).toBe('bulbasaur');
  });

  it('should handle errors', async () => {
    const mockAxiosError = {
      isAxiosError: true,
      response: { status: 404 },
      message: 'Not Found',
    };
    vi.mocked(baseApi.get).mockRejectedValueOnce(mockAxiosError);

    const { result } = renderHook(() => usePokemons('unknown', 1), {
      wrapper: QueryClientWrapper,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toContain(
      'No Pokémon found for "unknown".'
    );
  });
});
