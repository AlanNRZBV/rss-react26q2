import { describe, expect, it, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { fetchPokemonById, fetchPokemons } from './pokemons';
import { baseApi } from './instance.ts';

import {
  rawPokemonResponse,
  pokemonListApiResponse,
} from '../test-utils/mocks/pokemonData';

vi.mock('axios', () => {
  const mockInstance = {
    get: vi.fn(),
    isAxiosError: vi.fn(),
  };
  return {
    default: mockInstance,
    ...mockInstance,
  };
});

vi.mock('./instance', () => ({
  baseApi: {
    get: vi.fn(),
  },
}));

describe('Pokemons API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchPokemonById', () => {
    it('fetches a pokemon successfully', async () => {
      vi.mocked(baseApi.get).mockResolvedValueOnce({
        data: {
          ...rawPokemonResponse,
          weight: 69,
          height: 7,
          abilities: [
            {
              ability: { name: 'overgrow' },
            },
          ],
        },
      });

      const result = await fetchPokemonById('1');
      expect(result.id).toBe(1);
      expect(result.name).toBe('bulbasaur');
      expect(result.abilities).toContain('overgrow');
    });

    it('throws error when fetch fails', async () => {
      vi.mocked(baseApi.get).mockRejectedValueOnce(new Error('API Error'));

      await expect(fetchPokemonById('1')).rejects.toThrow(
        'Failed to load details for pokemon #1'
      );
    });
  });

  describe('fetchPokemons', () => {
    it('fetches a single pokemon', async () => {
      vi.mocked(baseApi.get).mockResolvedValueOnce({
        data: rawPokemonResponse,
      });

      const result = await fetchPokemons('bulbasaur');
      expect(result.results).toHaveLength(1);
      expect(result.results[0].name).toBe('bulbasaur');
      expect(result.total).toBe(1);
    });

    it('Handles 404 HTTP codes', async () => {
      const mockAxiosError = {
        isAxiosError: true,
        response: { status: 404 },
        message: 'Not Found',
      };

      vi.mocked(baseApi.get).mockRejectedValueOnce(mockAxiosError);
      vi.mocked(axios.isAxiosError).mockReturnValueOnce(true);

      await expect(fetchPokemons('unknown-pokemon')).rejects.toThrow(
        'No Pokémon found for "unknown-pokemon".'
      );
    });

    it('Handles other Axios errors', async () => {
      const mockAxiosError = {
        isAxiosError: true,
        message: 'Network Error',
      };

      vi.mocked(baseApi.get).mockRejectedValueOnce(mockAxiosError);
      vi.mocked(axios.isAxiosError).mockReturnValueOnce(true);

      await expect(fetchPokemons('pikachu')).rejects.toThrow('Network Error');
    });

    it('Handles 500 HTTP codes', async () => {
      const mockAxiosError = {
        isAxiosError: true,
        response: { status: 500 },
        message: 'Internal Server Error',
      };

      vi.mocked(baseApi.get).mockRejectedValueOnce(mockAxiosError);
      vi.mocked(axios.isAxiosError).mockReturnValueOnce(true);

      await expect(fetchPokemons('pikachu')).rejects.toThrow(
        'Server error (500). Please try again later.'
      );
    });

    it('Fetches list when empty', async () => {
      vi.mocked(baseApi.get).mockResolvedValueOnce({
        data: {
          count: 100,
          results: pokemonListApiResponse.results,
        },
      });

      // ИСПРАВЛЕНО: используем mockResolvedValue (БЕЗ Once),
      // чтобы замокать ВСЕ итерации внутри Promise.all
      vi.mocked(axios.get).mockResolvedValue({
        data: rawPokemonResponse,
      });

      const result = await fetchPokemons();

      // Массив результатов теперь равен длине списка из моков
      expect(result.results).toHaveLength(
        pokemonListApiResponse.results.length
      );
      expect(result.results[0].name).toBe('bulbasaur');
      expect(result.total).toBe(100);
    });

    it('Throws generic error', async () => {
      vi.mocked(axios.isAxiosError).mockReturnValueOnce(false);
      vi.mocked(baseApi.get).mockRejectedValueOnce(
        new Error('Standard JS Error')
      );

      await expect(fetchPokemons('test')).rejects.toThrow('Standard JS Error');
    });
  });
});
