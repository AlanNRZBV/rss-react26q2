import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { usePokemonDetails } from './usePokemonDetails';
import { QueryClientWrapper } from '../test-utils/QueryClientWrapper';
import { baseApi } from '../api/instance.ts';
import { rawPokemonResponse } from '../test-utils/mocks/pokemonData';

vi.mock('../api/instance', () => ({
  baseApi: {
    get: vi.fn(),
  },
}));

describe('usePokemonDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return pokemon details', async () => {
    vi.mocked(baseApi.get).mockResolvedValueOnce({
      data: {
        ...rawPokemonResponse,
        weight: 69,
        height: 7,
        abilities: [{ ability: { name: 'overgrow' } }],
      },
    });

    const { result } = renderHook(() => usePokemonDetails('1'), {
      wrapper: QueryClientWrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.id).toBe(1);
    expect(result.current.data?.name).toBe('bulbasaur');
    expect(result.current.data?.abilities).toContain('overgrow');
  });

  it('should handle errors', async () => {
    const mockError = new Error('API Error');
    vi.mocked(baseApi.get).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => usePokemonDetails('1'), {
      wrapper: QueryClientWrapper,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe('API Error');
  });
});
