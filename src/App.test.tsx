import { fireEvent, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { STORAGE_KEY } from './lib/constants';
import { renderWithFileRoutes } from './test/file-route-utils';

const renderApp = async (searchTerm = '') => {
  await renderWithFileRoutes(<></>, {
    initialLocation: searchTerm ? `/?search=${searchTerm}` : '/',
  });
};

describe('App Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Shows empty input when no saved term exists', async () => {
    await renderApp();

    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toHaveValue('');
  });

  describe('User Interaction', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('Trims whitespace from search input before saving', async () => {
      await renderApp();

      const input = screen.getByPlaceholderText(/search/i);
      const button = screen.getByRole('button', { name: /catch/i });

      fireEvent.change(input, { target: { value: '  eevee  ' } });
      fireEvent.click(button);

      expect(localStorage.getItem(STORAGE_KEY)).toBe('eevee');
    });

    it('Saves search term to localStorage when search button is clicked', async () => {
      await renderApp();

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

    it('Retrieves saved search term on component mount', async () => {
      localStorage.setItem(STORAGE_KEY, 'bulbasaur');

      await renderApp();

      const input = screen.getByPlaceholderText(/search/i);

      expect(input).toHaveValue('bulbasaur');
    });

    it('Overwrites existing localStorage value when new search is performed', async () => {
      localStorage.setItem(STORAGE_KEY, 'old-pokemon');

      await renderApp();

      const input = screen.getByPlaceholderText(/search/i);
      const button = screen.getByRole('button', { name: /catch/i });

      fireEvent.change(input, { target: { value: 'new-pokemon' } });
      fireEvent.click(button);

      expect(localStorage.getItem(STORAGE_KEY)).toBe('new-pokemon');
    });
  });
});
