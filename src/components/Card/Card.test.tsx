import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Card from './Card';
import type { PokemonCardData } from '../../types/types';
import { mockPokemon } from '../../test-utils/mocks/pokemonData';
import { useSelectedPokemons, usePokemonActions } from '../../store/store.ts';

const mockNavigate = vi.fn();
vi.mock('../../routes/_layout.tsx', () => ({
  Route: {
    useNavigate: vi.fn(() => mockNavigate),
    useSearch: vi.fn(() => ({ page: 1 })),
  },
}));

vi.mock('../../store/store.ts', () => ({
  useSelectedPokemons: vi.fn(),
  usePokemonActions: vi.fn(),
}));

const corruptedPokemon: { id: number; name: string } = {
  id: 99,
  name: 'Corrupted',
};

describe('Card Component', () => {
  const mockTogglePokemons = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useSelectedPokemons).mockReturnValue([]);
    vi.mocked(usePokemonActions).mockReturnValue({
      togglePokemons: mockTogglePokemons,
      clearPokemons: vi.fn(),
      clearDetails: vi.fn(),
      toggleDetails: vi.fn(),
    });
  });

  it('Displays item name and description correctly', () => {
    render(<Card pokemon={mockPokemon} />);

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/electric/i)).toBeInTheDocument();
    expect(screen.getByText(/normal/i)).toBeInTheDocument();
    expect(screen.getByText(/HP: 35/i)).toBeInTheDocument();
    expect(screen.getByText(/Attack: 55/i)).toBeInTheDocument();

    const imageElement = screen.getByRole('img', { name: /pikachu/i });

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', mockPokemon.imageUrl);
  });

  it('Handles missing props gracefully (renders fallbacks)', () => {
    render(<Card pokemon={corruptedPokemon as unknown as PokemonCardData} />);

    expect(screen.getByText(/Corrupted/i)).toBeInTheDocument();
    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveAttribute(
      'src',
      'https://placehold.co/64x128?text=NoImage'
    );
    expect(screen.getByText(/HP: N\/A/i)).toBeInTheDocument();
    expect(screen.getByText(/Attack: N\/A/i)).toBeInTheDocument();
  });

  it('Returns null when pokemon object is falsy', () => {
    const { container } = render(
      <Card pokemon={null as unknown as PokemonCardData} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('navigates to details on click', () => {
    render(<Card pokemon={mockPokemon} />);
    const card = screen.getByText(/pikachu/i).closest('div');
    fireEvent.click(card!);

    expect(mockNavigate).toHaveBeenCalled();
  });

  it('shows checkbox as checked when pokemon is selected', () => {
    vi.mocked(useSelectedPokemons).mockReturnValue([mockPokemon]);
    render(<Card pokemon={mockPokemon} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('calls togglePokemons when checkbox is clicked', () => {
    render(<Card pokemon={mockPokemon} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockTogglePokemons).toHaveBeenCalledWith(mockPokemon);
  });
});
