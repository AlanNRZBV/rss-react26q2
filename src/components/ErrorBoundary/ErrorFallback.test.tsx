import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorFallback from './ErrorFallback';

describe('ErrorFallback Component', () => {
  it('renders error message and handles click', () => {
    const resetMock = vi.fn();
    const testError = new Error('Test fallback error');

    render(<ErrorFallback error={testError} resetError={resetMock} />);

    expect(screen.getByText('Test fallback error')).toBeInTheDocument();

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(resetMock).toHaveBeenCalledTimes(1);
  });
});
