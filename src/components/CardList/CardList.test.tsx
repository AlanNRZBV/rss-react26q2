import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CardList from './CardList';
import { fetchPokemons } from '../../api/pokemons';
import type { PokemonCardData } from '../../types/types';
import { mockPokemonList } from '../../test-utils/mocks/pokemonData';

vi.mock('../../api/pokemons', () => ({
  fetchPokemons: vi.fn(),
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
    render(<CardList searchTerm={searchTerm} />);
  });
};

describe('CardList Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Data Display Tests', () => {
    it('Correctly displays item names and descriptions', async () => {
      vi.mocked(fetchPokemons).mockResolvedValue({
        results: mockPokemonList,
        total: mockPokemonList.length,
      });

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

      vi.mocked(fetchPokemons).mockResolvedValue({
        results: corruptedData,
        total: corruptedData.length,
      });

      await renderCardList();

      const cards = await screen.findAllByTestId('mock-card');

      expect(cards).toHaveLength(2);
      expect(screen.getAllByText('N/A')).toHaveLength(2);
    });
  });

  describe('Error Handling Tests (UI)', () => {
    it('Displays error message when API call fails', async () => {
      vi.mocked(fetchPokemons).mockRejectedValue(
        new Error('Network connection lost')
      );

      await renderCardList();

      const errorMessage = await screen.findByText('Network connection lost');

      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('Accessibility Tests', () => {
    it('Has appropriate ARIA labels for screen readers', async () => {
      vi.mocked(fetchPokemons).mockImplementation(() => new Promise(() => {}));

      await renderCardList();

      const spinner = screen.getByLabelText(/loading pokemons/i);

      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveAttribute('role', 'status');
    });
  });

  describe('Integration Tests', () => {
    it('Makes initial API call on component mount', async () => {
      await renderCardList();

      expect(fetchPokemons).toHaveBeenCalledTimes(1);
    });

    it('Manages loading states during API calls', async () => {
      let resolveApi: (val: {
        results: PokemonCardData[];
        total: number;
      }) => void;
      vi.mocked(fetchPokemons).mockImplementation(
        () =>
          new Promise((resolve) => {
            resolveApi = resolve;
          })
      );

      await renderCardList();

      const spinner = screen.getByLabelText(/loading pokemons/i);
      expect(spinner).toBeInTheDocument();

      await act(async () => {
        resolveApi!({ results: [], total: 0 });
      });

      const noResults = await screen.findByText(/no results/i);
      expect(noResults).toBeInTheDocument();
      expect(spinner).not.toBeInTheDocument();
    });
  });

  describe('API Integration Tests', () => {
    it('Calls API with correct parameters', async () => {
      await renderCardList('mewtwo');

      expect(fetchPokemons).toHaveBeenCalledWith('mewtwo', 25, 0);
    });

    it('Handles successful API responses', async () => {
      vi.mocked(fetchPokemons).mockResolvedValue({
        results: [mockPokemonList[0]],
        total: 1,
      });

      await renderCardList('bulbasaur');

      const card = await screen.findByText('bulbasaur');
      expect(card).toBeInTheDocument();
    });

    it('Handles API error responses', async () => {
      vi.mocked(fetchPokemons).mockRejectedValue(
        new Error('No Pokémon found.')
      );

      await renderCardList('unknown');

      const errorMsg = await screen.findByText('No Pokémon found.');
      expect(errorMsg).toBeInTheDocument();
    });
  });

  describe('State Management Tests', () => {
    it('Updates component state based on API responses', async () => {
      vi.mocked(fetchPokemons).mockResolvedValue({
        results: mockPokemonList,
        total: mockPokemonList.length,
      });

      await renderCardList();

      const cards = await screen.findAllByTestId('mock-card');
      expect(cards).toHaveLength(2);
    });
  });
});
