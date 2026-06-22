import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CardGrid from './CardList';
import type { PokemonCardData } from '../../types/types';
import { mockPokemonList } from '../../test-utils/mocks/pokemonData';
import { renderWithProviders } from '../../test-utils/test-render';

vi.mock('../Card/Card.tsx', () => ({
  default: ({ pokemon }: { pokemon: PokemonCardData }) => (
    <div data-testid="mock-card">
      <p>{pokemon?.name || 'N/A'}</p>
    </div>
  ),
}));

describe('CardGrid Component', () => {
  it('renders a card for each pokemon', () => {
    renderWithProviders(
      <CardGrid pokemons={mockPokemonList} isDetailsOpen={false} />
    );

    expect(screen.getAllByTestId('mock-card')).toHaveLength(
      mockPokemonList.length
    );
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('charmander')).toBeInTheDocument();
  });

  it('renders a fallback card label when name is missing', () => {
    const corruptedData = [
      { id: 99 },
      { id: 100, name: undefined },
    ] as unknown as PokemonCardData[];

    renderWithProviders(
      <CardGrid pokemons={corruptedData} isDetailsOpen={false} />
    );

    expect(screen.getAllByText('N/A')).toHaveLength(2);
  });

  it('shows an error message when there are no results', () => {
    renderWithProviders(<CardGrid pokemons={[]} isDetailsOpen={false} />);

    expect(screen.getByText(/no results/i)).toBeInTheDocument();
  });

  it('uses a narrower grid layout when details are open', () => {
    renderWithProviders(
      <CardGrid pokemons={mockPokemonList} isDetailsOpen={true} />
    );

    const grid = screen.getAllByTestId('mock-card')[0]?.parentElement;
    expect(grid?.className).toContain('lg:grid-cols-3');
  });
});
