import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithFileRoutes } from '../file-route-utils';

describe('Root Route', () => {
  it('renders application layout', async () => {
    await renderWithFileRoutes(<></>, {
      initialLocation: '/',
    });

    const navbar = screen.getByRole('navigation');
    expect(navbar).toBeInTheDocument();
  });

  it('renders notFoundComponent', async () => {
    await renderWithFileRoutes(<></>, {
      initialLocation: '/kek/asd/qwe?page=1',
    });
    const notFoundEl = await screen.findByText(/nothing found/i);

    expect(notFoundEl).toBeInTheDocument();
  });
});
