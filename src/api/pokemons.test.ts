import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { fetchPokemons } from './pokemons';

vi.mock('axios');

describe('API Error Handling Tests', () => {
  it('Shows appropriate error for different HTTP status codes (4xx)', async () => {
    const mockAxiosError = {
      isAxiosError: true,
      response: { status: 404 },
      message: 'Not Found',
    };

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

    vi.mocked(axios.isAxiosError).mockReturnValue(true);
    vi.mocked(axios.get).mockRejectedValue(mockAxiosError);

    await expect(fetchPokemons('pikachu')).rejects.toThrow(
      'Server error (500). Please try again later.'
    );
  });
});
