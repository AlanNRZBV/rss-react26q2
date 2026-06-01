import { screen, fireEvent, act, waitFor } from '@testing-library/react';
import { Suspense } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { usePokemonDetails } from '../../hooks/usePokemonDetails.ts';
import { createMockFileRoute } from '../../test/mock-route-utils';
import { renderWithProviders } from '../../test-utils/test-render';
import { mockPokemonDetailed } from '../../test-utils/mocks/pokemonData';

vi.mock('../../hooks/usePokemonDetails.ts', () => ({
  usePokemonDetails: vi.fn(),
}));

const mockNavigate = vi.fn();

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@tanstack/react-router')>();
  return {
    ...actual,
    createFileRoute: () => {
      return (options: Record<string, unknown>) => ({
        options,
        useParams: () => ({ pokemonId: '1' }),
        update: () => ({}),
        _addFileChildren: vi.fn().mockReturnThis(),
        _addFileTypes: vi.fn().mockReturnThis(),
      });
    },
  };
});

vi.mock('../../routes/_layout.tsx', () => ({
  Route: {
    useNavigate: () => mockNavigate,
  },
}));

const { Route } = await import('./$pokemonId');

const PokemonDetailsComponent = Route.options.component as React.FC;
const pokemonDetailsMockRoute = createMockFileRoute(
  '/_layout/$pokemonId',
  PokemonDetailsComponent
);

const renderPokemonDetails = async () => {
  const Component = pokemonDetailsMockRoute.component;
  await act(async () => {
    renderWithProviders(
      <Suspense
        fallback={
          <div data-testid="suspense-fallback">Suspense loading...</div>
        }
      >
        <Component />
      </Suspense>
    );
  });
  await waitFor(() => {
    expect(screen.queryByTestId('suspense-fallback')).not.toBeInTheDocument();
  });
};

describe('PokemonDetails Route Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state', async () => {
    vi.mocked(usePokemonDetails).mockReturnValue({
      data: undefined,
      isPending: true,
      isError: false,
      error: null,
    } as unknown as ReturnType<typeof usePokemonDetails>);

    await renderPokemonDetails();

    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('renders error state', async () => {
    vi.mocked(usePokemonDetails).mockReturnValue({
      data: undefined,
      isPending: false,
      isError: true,
      error: new Error('Pokemon not found'),
    } as unknown as ReturnType<typeof usePokemonDetails>);

    await renderPokemonDetails();
    expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument();
  });

  it('renders pokemon details correctly', async () => {
    vi.mocked(usePokemonDetails).mockReturnValue({
      data: mockPokemonDetailed,
      isPending: false,
      isError: false,
      error: null,
    } as unknown as ReturnType<typeof usePokemonDetails>);

    await renderPokemonDetails();

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('6.9 kg')).toBeInTheDocument();
    expect(screen.getByText('0.7 m')).toBeInTheDocument();
    expect(screen.getByText('overgrow')).toBeInTheDocument();
  });

  it('calls navigate when close button is clicked', async () => {
    vi.mocked(usePokemonDetails).mockReturnValue({
      data: mockPokemonDetailed,
      isPending: false,
      isError: false,
      error: null,
    } as unknown as ReturnType<typeof usePokemonDetails>);

    await renderPokemonDetails();

    const closeButton = screen.getByLabelText('Close details');
    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalled();
  });
});
