import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  it('Renders search input and search button', () => {
    render(<SearchBar value="" onChange={vi.fn()} onSearch={vi.fn()} />);

    const input = screen.getByPlaceholderText(/search/i);

    const button = screen.getByRole('button', { name: /catch/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  describe('User Interaction Tests', () => {
    it('Updates input value when user types', () => {
      const onChangeMock = vi.fn();

      render(<SearchBar value="" onChange={onChangeMock} onSearch={vi.fn()} />);

      const input = screen.getByPlaceholderText(/search/i);

      fireEvent.change(input, { target: { value: 'pika' } });

      expect(onChangeMock).toHaveBeenCalledWith('pika');
    });

    it('Triggers search callback with correct parameters', () => {
      const onSearchMock = vi.fn();

      render(
        <SearchBar value="mew" onChange={vi.fn()} onSearch={onSearchMock} />
      );

      const button = screen.getByRole('button', { name: /catch/i });
      fireEvent.click(button);

      expect(onSearchMock).toHaveBeenCalled();
    });
  });
});
