import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { fetchPokemons } from './pokemons';
import { baseApi } from './instance.ts';
import { rawPokemonResponse } from '../tests/mocks/pokemonData';

vi.mock('axios');

vi.mock('./instance', () => ({
  baseApi: {
    get: vi.fn(),
  },
}));

describe('API Error Handling Tests', () => {
  it('Shows appropriate error for different HTTP status codes (4xx)', async () => {
    const mockAxiosError = {
      isAxiosError: true,
      response: { status: 404 },
      message: 'Not Found',
    };

    vi.mocked(baseApi.get).mockRejectedValue(mockAxiosError);

    vi.mocked(axios.isAxiosError).mockReturnValue(true);
    vi.mocked(axios.get).mockRejectedValue(mockAxiosError);

    await expect(fetchPokemons('unknown-pokemon')).rejects.toThrow(
      'No Pokémon found for "unknown-pokemon".'
    );
  });

  it('Shows appropriate error for different HTTP status codes (5xx)', async () => {
    const mockAxiosError = {
      isAxiosError: true,
      response: { status: 500 },
      message: 'Internal Server Error',
    };

    vi.mocked(baseApi.get).mockRejectedValue(mockAxiosError);

    vi.mocked(axios.isAxiosError).mockReturnValue(true);
    vi.mocked(axios.get).mockRejectedValue(mockAxiosError);

    await expect(fetchPokemons('pikachu')).rejects.toThrow(
      'Server error (500). Please try again later.'
    );
  });

  it('Fetches list of pokemons when searchTerm is empty', async () => {
    vi.mocked(baseApi.get).mockResolvedValueOnce({
      data: {
        results: [{ name: 'bulbasaur', url: '/pokemon/1' }],
      },
    });

    vi.mocked(axios.get).mockResolvedValueOnce({
      data: rawPokemonResponse,
    });

    const result = await fetchPokemons();
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('bulbasaur');
  });

  it('Throws generic error if not an AxiosError', async () => {
    vi.mocked(axios.isAxiosError).mockReturnValue(false);
    vi.mocked(baseApi.get).mockRejectedValue(new Error('Standard JS Error'));

    await expect(fetchPokemons('test')).rejects.toThrow('Standard JS Error');
  });
});
