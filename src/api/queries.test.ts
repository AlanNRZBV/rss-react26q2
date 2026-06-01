import { describe, expect, it, vi, beforeEach } from 'vitest';
import axios from 'axios';
import {
  getPokemonsQueryOptions,
  getPokemonDetailsQueryOptions,
} from './queries';
import { baseApi } from './instance.ts';
import {
  rawPokemonResponse,
  pokemonListApiResponse,
} from '../test-utils/mocks/pokemonData';
import { createTestQueryClient } from '../test-utils/QueryClientWrapper.tsx';

const testClient = createTestQueryClient();

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

vi.mock('./instance', () => ({
  baseApi: {
    get: vi.fn(),
  },
}));

describe('Queries API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getPokemonDetailsQueryOptions', () => {
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

      const options = getPokemonDetailsQueryOptions('1');
      if (typeof options.queryFn !== 'function') {
        throw new Error('queryFn is not a function');
      }

      const result = await options.queryFn({
        queryKey: options.queryKey,
        meta: undefined,
        signal: new AbortController().signal,
        client: testClient,
      });

      if (!result) {
        throw new Error('Expected queryFn to return data, but got undefined');
      }

      expect(result.id).toBe(1);
      expect(result.name).toBe('bulbasaur');
      expect(result.abilities).toContain('overgrow');
    });

    it('throws error when fetch fails', async () => {
      const mockError = new Error('API Error');
      vi.mocked(baseApi.get).mockRejectedValueOnce(mockError);

      const options = getPokemonDetailsQueryOptions('1');
      if (typeof options.queryFn !== 'function') {
        throw new Error('queryFn is not a function');
      }

      await expect(
        options.queryFn({
          queryKey: options.queryKey,
          meta: undefined,
          signal: new AbortController().signal,
          client: testClient,
        })
      ).rejects.toThrow('API Error');
    });
  });

  describe('getPokemonsQueryOptions', () => {
    it('fetches a single pokemon when searchTerm is provided', async () => {
      vi.mocked(baseApi.get).mockResolvedValueOnce({
        data: rawPokemonResponse,
      });

      const options = getPokemonsQueryOptions('bulbasaur');
      if (typeof options.queryFn !== 'function') {
        throw new Error('queryFn is not a function');
      }

      const result = await options.queryFn({
        queryKey: options.queryKey,
        meta: undefined,
        signal: new AbortController().signal,
        client: testClient,
      });

      if (!result) {
        throw new Error('Expected queryFn to return data, but got undefined');
      }

      expect(result.results).toHaveLength(1);
      expect(result.results[0].name).toBe('bulbasaur');
      expect(result.total).toBe(1);
    });

    it('Handles 404 HTTP codes via handleApiError', async () => {
      const mockAxiosError = {
        isAxiosError: true,
        response: { status: 404 },
        message: 'Not Found',
      };

      vi.mocked(baseApi.get).mockRejectedValueOnce(mockAxiosError);

      const options = getPokemonsQueryOptions('unknown-pokemon');
      if (typeof options.queryFn !== 'function') {
        throw new Error('queryFn is not a function');
      }

      await expect(
        options.queryFn({
          queryKey: options.queryKey,
          meta: undefined,
          signal: new AbortController().signal,
          client: testClient,
        })
      ).rejects.toThrow('No Pokémon found for "unknown-pokemon".');
    });

    it('Handles 500 HTTP codes via handleApiError', async () => {
      const mockAxiosError = {
        isAxiosError: true,
        response: { status: 500 },
        message: 'Internal Server Error',
      };

      vi.mocked(baseApi.get).mockRejectedValueOnce(mockAxiosError);

      const options = getPokemonsQueryOptions('pikachu');
      if (typeof options.queryFn !== 'function') {
        throw new Error('queryFn is not a function');
      }

      await expect(
        options.queryFn({
          queryKey: options.queryKey,
          meta: undefined,
          signal: new AbortController().signal,
          client: testClient,
        })
      ).rejects.toThrow('Server error. Please try again later.');
    });

    it('Handles other Axios errors via handleApiError', async () => {
      const mockAxiosError = {
        isAxiosError: true,
        code: 'ERR_NETWORK',
        message: 'Network Error',
      };

      vi.mocked(baseApi.get).mockRejectedValueOnce(mockAxiosError);

      const options = getPokemonsQueryOptions('pikachu');
      if (typeof options.queryFn !== 'function') {
        throw new Error('queryFn is not a function');
      }

      await expect(
        options.queryFn({
          queryKey: options.queryKey,
          meta: undefined,
          signal: new AbortController().signal,
          client: testClient,
        })
      ).rejects.toThrow(
        'Network error. Please check your internet connection.'
      );
    });

    it('Fetches list when searchTerm is empty', async () => {
      vi.mocked(baseApi.get).mockResolvedValueOnce({
        data: {
          count: 100,
          results: pokemonListApiResponse.results,
        },
      });

      vi.mocked(axios.get).mockResolvedValue({
        data: rawPokemonResponse,
      });

      const options = getPokemonsQueryOptions('');
      if (typeof options.queryFn !== 'function') {
        throw new Error('queryFn is not a function');
      }

      const result = await options.queryFn({
        queryKey: options.queryKey,
        meta: undefined,
        signal: new AbortController().signal,
        client: testClient,
      });

      if (!result) {
        throw new Error('Expected queryFn to return data, but got undefined');
      }

      expect(result.results).toHaveLength(
        pokemonListApiResponse.results.length
      );
      expect(result.results[0].name).toBe('bulbasaur');
      expect(result.total).toBe(100);
    });
  });
});
