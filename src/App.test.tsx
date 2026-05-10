import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from './App';
import { STORAGE_KEY } from './lib/constants';

vi.mock('./components/CardList/CardList.tsx', () => ({
  default: () => <div data-testid="mock-card-list" />,
}));

vi.mock('./components/CardList/CardList.tsx', () => ({
  default: () => <div data-testid="mock-card-list" />,
}));

describe('App Component (SearchBar Integration)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Displays previously saved search term from localStorage on mount', () => {
    localStorage.setItem(STORAGE_KEY, 'pikachu');

    render(<App />);

    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toHaveValue('pikachu');
  });

  it('Shows empty input when no saved term exists', () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toHaveValue('');
  });
});
