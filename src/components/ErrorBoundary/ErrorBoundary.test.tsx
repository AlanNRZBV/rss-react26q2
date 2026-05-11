import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ErrorBoundary from './ErrorBoundary';
import App from '../../App.tsx';

vi.mock('../CardList/CardList.tsx', () => ({
  default: () => <div data-testid="mock-card-list" />,
}));

vi.mock('./ErrorFallback', () => ({
  default: ({
    error,
    resetError,
  }: {
    error: Error;
    resetError: () => void;
  }) => (
    <div data-testid="fallback-ui">
      <p>{error.message}</p>
      <button onClick={resetError}>Try Again</button>
    </div>
  ),
}));

describe('Error Catching Tests', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Fallback UI and Console Logging', () => {
    it('Displays fallback UI when error occurs', () => {
      render(
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      );

      fireEvent.click(screen.getByRole('button', { name: /Simulate Error/i }));

      expect(screen.getByTestId('fallback-ui')).toBeInTheDocument();
      expect(
        screen.getByText('Simulated application error')
      ).toBeInTheDocument();
    });

    it('Logs error to console', () => {
      render(
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      );

      fireEvent.click(screen.getByRole('button', { name: /Simulate Error/i }));

      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('Error Button Tests', () => {
    it('Throws error when test button is clicked', () => {
      render(
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      );

      const simulateBtn = screen.getByRole('button', {
        name: /Simulate Error/i,
      });
      fireEvent.click(simulateBtn);

      expect(console.error).toHaveBeenCalledWith(
        'Simulated error triggered by user'
      );
    });

    it('Triggers error boundary fallback UI', () => {
      render(
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      );

      expect(screen.queryByTestId('fallback-ui')).not.toBeInTheDocument();

      const simulateBtn = screen.getByRole('button', {
        name: /Simulate Error/i,
      });

      fireEvent.click(simulateBtn);

      expect(screen.getByTestId('fallback-ui')).toBeInTheDocument();
    });
  });
  it('Recovers from error when reset is clicked', () => {
    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByRole('button', { name: /Simulate Error/i }));
    expect(screen.getByTestId('fallback-ui')).toBeInTheDocument();

    const resetBtn = screen.getByRole('button', { name: /Try Again/i });
    fireEvent.click(resetBtn);

    expect(
      screen.getByRole('button', { name: /Simulate Error/i })
    ).toBeInTheDocument();

    expect(screen.queryByTestId('fallback-ui')).not.toBeInTheDocument();
  });
});
