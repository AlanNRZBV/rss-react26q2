import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { renderWithFileRoutes } from '../../file-route-utils';

vi.mock('../../../api/queries.ts', () => ({
  getPokemonsQueryOptions: vi.fn(() => ({
    queryKey: ['pokemons'],
    queryFn: () => Promise.resolve({ results: [], total: 0 }),
  })),
}));

const renderAbout = async () => {
  await renderWithFileRoutes(<></>, {
    initialLocation: '/about/',
  });
};

describe('About index route', () => {
  it('renders the layout with NavBar and ProjectDetails correctly', async () => {
    await renderAbout();

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Project Details')).toBeInTheDocument();
    expect(screen.getByText('Author')).toBeInTheDocument();
    expect(screen.getByText('Alan')).toBeInTheDocument();
  });
});
