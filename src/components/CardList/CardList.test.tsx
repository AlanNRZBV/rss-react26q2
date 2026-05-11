import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CardList from './CardList';
import { fetchPokemons } from '../../api/pokemons';
import type { PokemonCardData } from '../../types';

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
      const mockData = [
        { id: 1, name: 'bulbasaur' },
        { id: 2, name: 'charmander' },
      ] as unknown as PokemonCardData[];

      vi.mocked(fetchPokemons).mockResolvedValue(mockData);

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
    const mockData = [
      { id: 1, name: 'bulbasaur' },
      { id: 2, name: 'ivysaur' },
      { id: 3, name: 'venusaur' },
    ] as unknown as PokemonCardData[];

    vi.mocked(fetchPokemons).mockResolvedValue(mockData);

    const { container } = render(<CardList searchTerm="bulbasaur" />);

    const cards = await screen.findAllByTestId('mock-card');
    expect(cards).toHaveLength(3);

    const spinner = container.querySelector('.animate-spin');
    expect(spinner).not.toBeInTheDocument();
  });
});
