import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Container from './Container';

describe('Container', () => {
  it('renders its children', () => {
    render(
      <Container>
        <span>child content</span>
      </Container>
    );

    expect(screen.getByText(/child content/i)).toBeInTheDocument();
  });

  it('applies the provided className and forwards props', () => {
    render(
      <Container className="extra-class" data-testid="container">
        <span>content</span>
      </Container>
    );

    const container = screen.getByTestId('container');
    expect(container).toHaveClass('extra-class');
    expect(container).toHaveAttribute('id', 'container');
  });
});
