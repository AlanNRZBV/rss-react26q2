import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { renderWithFileRoutes } from '../../file-route-utils';

const renderAbout = async () => {
  await renderWithFileRoutes(<></>, { initialLocation: '/about/' });
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
