import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  it('renders nothing when totalPages is 1', async () => {
    const ui = await Pagination({ currentPage: 1, totalPages: 1 });
    const { container } = render(ui);

    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when totalPages is 0', async () => {
    const ui = await Pagination({ currentPage: 1, totalPages: 0 });
    const { container } = render(ui);

    expect(container.firstChild).toBeNull();
  });

  it('renders pagination with previous and next links', async () => {
    render(await Pagination({ currentPage: 1, totalPages: 5 }));

    expect(screen.getByLabelText(/previous page/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/next page/i)).toBeInTheDocument();
  });

  it('renders correct page numbers', async () => {
    render(await Pagination({ currentPage: 1, totalPages: 5 }));

    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(String(i))).toBeInTheDocument();
    }
  });

  it('renders previous as a disabled span on the first page', async () => {
    render(await Pagination({ currentPage: 1, totalPages: 5 }));

    const prev = screen.getByLabelText(/previous page/i);
    expect(prev.tagName).toBe('SPAN');
  });

  it('renders next as a disabled span on the last page', async () => {
    render(await Pagination({ currentPage: 5, totalPages: 5 }));

    const next = screen.getByLabelText(/next page/i);
    expect(next.tagName).toBe('SPAN');
  });

  it('renders both prev and next as links on a middle page', async () => {
    render(await Pagination({ currentPage: 3, totalPages: 5 }));

    expect(screen.getByLabelText(/previous page/i).tagName).toBe('A');
    expect(screen.getByLabelText(/next page/i).tagName).toBe('A');
  });

  it('links to the next page href when next is not disabled', async () => {
    render(await Pagination({ currentPage: 2, totalPages: 5 }));

    expect(screen.getByLabelText(/next page/i)).toHaveAttribute(
      'href',
      '/?page=3'
    );
  });

  it('links to the previous page href when previous is not disabled', async () => {
    render(await Pagination({ currentPage: 3, totalPages: 5 }));

    expect(screen.getByLabelText(/previous page/i)).toHaveAttribute(
      'href',
      '/?page=2'
    );
  });

  it('renders a link for each page number', async () => {
    render(await Pagination({ currentPage: 1, totalPages: 5 }));

    const pageFour = screen.getByText('4');
    expect(pageFour.tagName).toBe('A');
    expect(pageFour).toHaveAttribute('href', '/?page=4');
  });

  it('renders the active page as a plain list item, not a link', async () => {
    render(await Pagination({ currentPage: 3, totalPages: 5 }));

    const activePage = screen.getByText('3');
    expect(activePage.tagName).toBe('LI');
  });

  it('preserves the query string in page links', async () => {
    render(
      await Pagination({ currentPage: 1, totalPages: 5, query: 'pikachu' })
    );

    expect(screen.getByText('2')).toHaveAttribute(
      'href',
      '/?page=2&q=pikachu'
    );
  });

  it('shows at most 5 page items for large total pages', async () => {
    render(await Pagination({ currentPage: 5, totalPages: 20 }));

    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.queryByText('2')).not.toBeInTheDocument();
    expect(screen.queryByText('8')).not.toBeInTheDocument();
  });

  it('adjusts page window at the start of pagination', async () => {
    render(await Pagination({ currentPage: 1, totalPages: 20 }));

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.queryByText('6')).not.toBeInTheDocument();
  });

  it('adjusts page window at the end of pagination', async () => {
    render(await Pagination({ currentPage: 20, totalPages: 20 }));

    expect(screen.getByText('16')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.queryByText('15')).not.toBeInTheDocument();
  });

  it('renders only 2 pages when totalPages is 2', async () => {
    render(await Pagination({ currentPage: 1, totalPages: 2 }));

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.queryByText('3')).not.toBeInTheDocument();
  });
});
