import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from './App';
import { STORAGE_KEY } from './lib/constants';

vi.mock('./components/CardList/CardList.tsx', () => ({
  default: () => <div data-testid="mock-card-list" />,
}));

vi.mock('./components/CardList/CardList.tsx', () => ({
  default: () => <div data-testid="mock-card-list" />,
}));

describe('App Component', () => {
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

  describe('User Interaction', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('Trims whitespace from search input before saving', () => {
      render(<App />);

      const input = screen.getByPlaceholderText(/search/i);
      const button = screen.getByRole('button', { name: /catch/i });

      fireEvent.change(input, { target: { value: '  eevee  ' } });
      fireEvent.click(button);

      expect(localStorage.getItem(STORAGE_KEY)).toBe('eevee');
    });

    it('Saves search term to localStorage when search button is clicked', () => {
      render(<App />);

      const input = screen.getByPlaceholderText(/search/i);
      const button = screen.getByRole('button', { name: /catch/i });

      fireEvent.change(input, { target: { value: 'snorlax' } });
      fireEvent.click(button);

      expect(localStorage.getItem(STORAGE_KEY)).toBe('snorlax');
    });
  });

  describe('LocalStorage Integration', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('Retrieves saved search term on component mount', () => {
      localStorage.setItem(STORAGE_KEY, 'bulbasaur');

      render(<App />);

      const input = screen.getByPlaceholderText(/search/i);

      expect(input).toHaveValue('bulbasaur');
    });

    it('Overwrites existing localStorage value when new search is performed', () => {
      localStorage.setItem(STORAGE_KEY, 'old-pokemon');

      render(<App />);

      const input = screen.getByPlaceholderText(/search/i);
      const button = screen.getByRole('button', { name: /catch/i });

      fireEvent.change(input, { target: { value: 'new-pokemon' } });
      fireEvent.click(button);

      expect(localStorage.getItem(STORAGE_KEY)).toBe('new-pokemon');
    });
  });
});
