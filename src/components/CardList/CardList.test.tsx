import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CardList from './CardList';
import { fetchPokemons } from '../../api/pokemons';
import type { PokemonCardData } from '../../types';

vi.mock('../../api/pokemons', () => ({
  fetchPokemons: vi.fn(),
}));

vi.mock('../Card/Card.tsx', () => ({
  default: () => <div data-testid="mock-card">Card</div>,
}));

describe('CardList Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
