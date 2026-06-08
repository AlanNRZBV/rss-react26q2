import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from './App';

beforeEach(() => {
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

describe('App', () => {
  it('renders the controlled and uncontrolled trigger buttons', () => {
    render(<App />);

    expect(
      screen.getByRole('button', { name: /^controlled$/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /^uncontrolled$/i })
    ).toBeInTheDocument();
  });

  it('opens the controlled form modal', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /^controlled$/i }));

    expect(screen.getByText('Controlled Form')).toBeInTheDocument();
    expect(
      screen.getByText(/controlled form description/i)
    ).toBeInTheDocument();
  });

  it('opens the uncontrolled form modal', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /^uncontrolled$/i }));

    expect(screen.getByText('Uncontrolled Form')).toBeInTheDocument();
    expect(
      screen.getByText(/uncontrolled form description/i)
    ).toBeInTheDocument();
  });
});
