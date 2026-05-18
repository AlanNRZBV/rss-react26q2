import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProjectDetails from './ProjectDetails';

describe('ProjectDetails Component', () => {
  it('Renders project details correctly', () => {
    render(<ProjectDetails />);

    expect(screen.getByText('Project Details')).toBeInTheDocument();
    expect(screen.getByText('Author')).toBeInTheDocument();
    expect(screen.getByText('Alan')).toBeInTheDocument();
    expect(screen.getByText('Tasks Repository')).toBeInTheDocument();
    expect(screen.getByText('GitHub RS School')).toBeInTheDocument();
    expect(screen.getByText('Course Page')).toBeInTheDocument();
    expect(screen.getByText('Rs.school React')).toBeInTheDocument();
  });

  it('Renders links with correct hrefs', () => {
    render(<ProjectDetails />);

    const authorLink = screen.getByText('Alan');
    expect(authorLink).toHaveAttribute('href', 'https://github.com/AlanNRZBV');

    const repoLink = screen.getByText('GitHub RS School');
    expect(repoLink).toHaveAttribute(
      'href',
      'https://github.com/rolling-scopes-school/tasks/tree/master/react'
    );

    const courseLink = screen.getByText('Rs.school React');
    expect(courseLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
  });
});
