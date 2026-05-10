import { render, screen } from '@testing-library/react';
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
});
