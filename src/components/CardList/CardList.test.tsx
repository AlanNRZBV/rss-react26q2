import { screen, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CardList from './CardList';
import { getPokemonsQueryOptions } from '../../api/queries.ts';
import type { PokemonCardData } from '../../types/types';
import { mockPokemonList } from '../../test-utils/mocks/pokemonData';
import { renderWithProviders } from '../../test-utils/test-render';
import {
  mockPokemonsQuery,
  mockQueryError,
  mockQueryLoading,
} from '../../test-utils/queryMocks';

vi.mock('../../api/queries.ts', () => ({
  getPokemonsQueryOptions: vi.fn(),
}));

vi.mock('../Card/Card.tsx', () => ({
  default: ({ pokemon }: { pokemon: PokemonCardData }) => (
    <div data-testid="mock-card">
      <p>{pokemon?.name || 'N/A'}</p>
    </div>
  ),
}));

vi.mock('../Pagination/Pagination.tsx', () => ({
  default: () => <div data-testid="mock-pagination" />,
}));

vi.mock('@tanstack/react-router', () => ({
  useMatchRoute: vi.fn(() => vi.fn(() => false)),
  useNavigate: vi.fn(() => vi.fn()),
}));

vi.mock('../../routes/_layout.tsx', () => ({
  Route: {
    useSearch: vi.fn(() => ({ page: 1 })),
    useNavigate: vi.fn(() => vi.fn()),
    id: '_layout',
  },
}));

const renderCardList = async (searchTerm = '') => {
  await act(async () => {
    renderWithProviders(<CardList searchTerm={searchTerm} />);
  });
};

describe('CardList Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Data Display Tests', () => {
    it('Correctly displays item names and descriptions', async () => {
      vi.mocked(getPokemonsQueryOptions).mockReturnValue(mockPokemonsQuery());

      await renderCardList();

      await screen.findAllByTestId('mock-card');

      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('charmander')).toBeInTheDocument();
    });

    it('Handles missing or undefined data gracefully', async () => {
      const corruptedData = [
        { id: 99 },
        { id: 100, name: undefined },
      ] as unknown as PokemonCardData[];

      vi.mocked(getPokemonsQueryOptions).mockReturnValue(
        mockPokemonsQuery(corruptedData)
      );

      await renderCardList();

      const cards = await screen.findAllByTestId('mock-card');

      expect(cards).toHaveLength(2);
      expect(screen.getAllByText('N/A')).toHaveLength(2);
    });
  });

  describe('Error Handling Tests (UI)', () => {
    it('Displays error message when API call fails', async () => {
      vi.mocked(getPokemonsQueryOptions).mockReturnValue(
        mockQueryError('Network connection lost') as unknown as ReturnType<
          typeof getPokemonsQueryOptions
        >
      );

      await renderCardList();

      const errorMessage = await screen.findByText('Network connection lost');

      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('Accessibility Tests', () => {
    it('Has appropriate ARIA labels for screen readers', async () => {
      vi.mocked(getPokemonsQueryOptions).mockReturnValue(
        mockQueryLoading() as unknown as ReturnType<
          typeof getPokemonsQueryOptions
        >
      );

      await renderCardList();

      const spinner = screen.getByLabelText(/loading pokemons/i);

      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveAttribute('role', 'status');
    });
  });

  describe('Integration Tests', () => {
    it('Makes initial API call on component mount', async () => {
      vi.mocked(getPokemonsQueryOptions).mockReturnValue(
        mockPokemonsQuery([], 0)
      );
      await renderCardList();

      expect(getPokemonsQueryOptions).toHaveBeenCalled();
    });

    it('Manages loading states during API calls', async () => {
      let resolveApi: (val: {
        results: PokemonCardData[];
        total: number;
      }) => void;
      vi.mocked(getPokemonsQueryOptions).mockReturnValue({
        queryKey: ['pokemons', 'list'],
        queryFn: () =>
          new Promise((resolve) => {
            resolveApi = resolve;
          }),
      } as unknown as ReturnType<typeof getPokemonsQueryOptions>);

      await renderCardList();

      const spinner = screen.getByLabelText(/loading pokemons/i);
      expect(spinner).toBeInTheDocument();

      await act(async () => {
        resolveApi!({ results: [], total: 0 });
      });

      await waitFor(() => {
        expect(
          screen.queryByLabelText(/loading pokemons/i)
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('API Integration Tests', () => {
    it('Calls API with correct parameters', async () => {
      vi.mocked(getPokemonsQueryOptions).mockReturnValue(
        mockPokemonsQuery([], 0)
      );

      await renderCardList('mewtwo');

      expect(getPokemonsQueryOptions).toHaveBeenCalledWith('mewtwo', 1, 25);
    });

    it('Handles successful API responses', async () => {
      vi.mocked(getPokemonsQueryOptions).mockReturnValue(
        mockPokemonsQuery([mockPokemonList[0]], 1)
      );

      await renderCardList('bulbasaur');

      const card = await screen.findByText('bulbasaur');
      expect(card).toBeInTheDocument();
    });

    it('Handles API error responses', async () => {
      vi.mocked(getPokemonsQueryOptions).mockReturnValue(
        mockQueryError('No Pokémon found.') as unknown as ReturnType<
          typeof getPokemonsQueryOptions
        >
      );

      await renderCardList('unknown');

      const errorMsg = await screen.findByText('No Pokémon found.');
      expect(errorMsg).toBeInTheDocument();
    });
  });

  describe('State Management Tests', () => {
    it('Updates component state based on API responses', async () => {
      vi.mocked(getPokemonsQueryOptions).mockReturnValue(mockPokemonsQuery());

      await renderCardList();

      const cards = await screen.findAllByTestId('mock-card');
      expect(cards).toHaveLength(2);
    });
  });
});
