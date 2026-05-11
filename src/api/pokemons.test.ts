import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { fetchPokemons } from './pokemons';
import { baseApi } from './instance.ts';

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
});
