import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CardList from './CardList';
import { fetchPokemons } from '../../api/pokemons';
import type { PokemonCardData } from '../../types';
import { mockPokemonList } from '../../tests/mocks/pokemonData';

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

describe('CardList Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Data Display Tests', () => {
    it('Correctly displays item names and descriptions', async () => {
      vi.mocked(fetchPokemons).mockResolvedValue(mockPokemonList);

      render(<CardList searchTerm="" />);

      await screen.findAllByTestId('mock-card');

      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('charmander')).toBeInTheDocument();
    });

    it('Handles missing or undefined data gracefully', async () => {
      const corruptedData = [
        { id: 99 },
        { id: 100, name: undefined },
      ] as unknown as PokemonCardData[];

      vi.mocked(fetchPokemons).mockResolvedValue(corruptedData);

      render(<CardList searchTerm="" />);

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

      render(<CardList searchTerm="" />);

      const errorMessage = await screen.findByText('Network connection lost');

      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('Accessibility Tests', () => {
    it('Has appropriate ARIA labels for screen readers', () => {
      vi.mocked(fetchPokemons).mockImplementation(() => new Promise(() => {}));

      render(<CardList searchTerm="" />);

      const spinner = screen.getByLabelText(/loading pokemons/i);

      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveAttribute('role', 'status');
    });
  });

  describe('Integration Tests', () => {
    it('Makes initial API call on component mount', () => {
      render(<CardList searchTerm="" />);

      expect(fetchPokemons).toHaveBeenCalledTimes(1);
    });

    it('Manages loading states during API calls', async () => {
      let resolveApi: (val: PokemonCardData[]) => void;
      vi.mocked(fetchPokemons).mockImplementation(
        () =>
          new Promise((resolve) => {
            resolveApi = resolve;
          })
      );

      render(<CardList searchTerm="" />);

      const spinner = screen.getByLabelText(/loading pokemons/i);
      expect(spinner).toBeInTheDocument();

      resolveApi!([]);

      const noResults = await screen.findByText(/no results/i);
      expect(noResults).toBeInTheDocument();
      expect(spinner).not.toBeInTheDocument();
    });
  });

  describe('API Integration Tests', () => {
    it('Calls API with correct parameters', () => {
      render(<CardList searchTerm="mewtwo" />);

      expect(fetchPokemons).toHaveBeenCalledWith('mewtwo');
    });

    it('Handles successful API responses', async () => {
      vi.mocked(fetchPokemons).mockResolvedValue([mockPokemonList[0]]);

      render(<CardList searchTerm="bulbasaur" />);

      const card = await screen.findByText('bulbasaur');
      expect(card).toBeInTheDocument();
    });

    it('Handles API error responses', async () => {
      vi.mocked(fetchPokemons).mockRejectedValue(
        new Error('No Pokémon found.')
      );

      render(<CardList searchTerm="unknown" />);

      const errorMsg = await screen.findByText('No Pokémon found.');
      expect(errorMsg).toBeInTheDocument();
    });
  });

  describe('State Management Tests', () => {
    it('Updates component state based on API responses', async () => {
      vi.mocked(fetchPokemons).mockResolvedValue(mockPokemonList);

      render(<CardList searchTerm="" />);

      const cards = await screen.findAllByTestId('mock-card');
      expect(cards).toHaveLength(2);
    });
  });

  it('Shows loading state while fetching data', () => {
    vi.mocked(fetchPokemons).mockImplementation(() => new Promise(() => {}));

    const { container } = render(<CardList searchTerm="" />);
    const spinner = container.querySelector('.animate-spin');

    expect(spinner).toBeInTheDocument();
  });

  it('Displays "no results" message when data array is empty', async () => {
    vi.mocked(fetchPokemons).mockResolvedValue([]);

    render(<CardList searchTerm="unknown" />);
    const noResults = await screen.findByText(/no results/i);

    expect(noResults).toBeInTheDocument();
  });

  it('Renders correct number of items when data is provided', async () => {
    vi.mocked(fetchPokemons).mockResolvedValue(mockPokemonList);

    const { container } = render(<CardList searchTerm="bulbasaur" />);

    const cards = await screen.findAllByTestId('mock-card');
    expect(cards).toHaveLength(2);

    const spinner = container.querySelector('.animate-spin');
    expect(spinner).not.toBeInTheDocument();
  });
});
