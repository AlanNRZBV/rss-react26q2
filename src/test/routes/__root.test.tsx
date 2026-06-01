import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderWithFileRoutes } from '../file-route-utils';

vi.mock('../../api/queries.ts', () => ({
  getPokemonsQueryOptions: vi.fn(() => ({
    queryKey: ['pokemons'],
    queryFn: () => Promise.resolve({ results: [], total: 0 }),
  })),
}));

const renderRoot = async (initialLocation = '/') => {
  await renderWithFileRoutes(<></>, {
    initialLocation,
  });
};

describe('Root Route', () => {
  it('renders application layout', async () => {
    await renderRoot('/');

    const navbar = screen.getByRole('navigation');
    expect(navbar).toBeInTheDocument();
  });

  it('renders notFoundComponent', async () => {
    await renderRoot('/kek/asd/qwe?page=1');
    const notFoundEl = await screen.findByText(/nothing found/i);

    expect(notFoundEl).toBeInTheDocument();
  });
});
