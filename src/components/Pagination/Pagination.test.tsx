import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  it('renders nothing when totalPages is 1', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={vi.fn()} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when totalPages is 0', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={0} onPageChange={vi.fn()} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders pagination with previous and next buttons', () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />
    );

    expect(
      screen.getByRole('button', { name: /previous page/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /next page/i })
    ).toBeInTheDocument();
  });

  it('renders correct page numbers', () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />
    );

    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(String(i))).toBeInTheDocument();
    }
  });

  it('disables previous button on the first page', () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />
    );

    const prevButton = screen.getByRole('button', { name: /previous page/i });

    expect(prevButton).toBeDisabled();
  });

  it('disables next button on the last page', () => {
    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={vi.fn()} />
    );

    const nextButton = screen.getByRole('button', { name: /next page/i });

    expect(nextButton).toBeDisabled();
  });

  it('enables both buttons on a middle page', () => {
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={vi.fn()} />
    );

    expect(
      screen.getByRole('button', { name: /previous page/i })
    ).not.toBeDisabled();
    expect(
      screen.getByRole('button', { name: /next page/i })
    ).not.toBeDisabled();
  });

  it('calls onPageChange with next page when next button is clicked', () => {
    const onPageChange = vi.fn();

    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />
    );

    fireEvent.click(screen.getByRole('button', { name: /next page/i }));

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange with previous page when previous button is clicked', () => {
    const onPageChange = vi.fn();

    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />
    );

    fireEvent.click(screen.getByRole('button', { name: /previous page/i }));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange when a page number is clicked', () => {
    const onPageChange = vi.fn();

    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />
    );

    fireEvent.click(screen.getByText('4'));

    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('does not call onPageChange when the active page is clicked', () => {
    const onPageChange = vi.fn();

    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />
    );

    const activePage = screen.getByText('3');

    expect(activePage.tagName).toBe('LI');
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('does not call onPageChange when previous is clicked on the first page', () => {
    const onPageChange = vi.fn();

    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />
    );

    fireEvent.click(screen.getByRole('button', { name: /previous page/i }));

    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('does not call onPageChange when next is clicked on the last page', () => {
    const onPageChange = vi.fn();

    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={onPageChange} />
    );

    fireEvent.click(screen.getByRole('button', { name: /next page/i }));

    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('shows at most 5 page items for large total pages', () => {
    render(
      <Pagination currentPage={5} totalPages={20} onPageChange={vi.fn()} />
    );

    const allButtons = screen.getAllByRole('button');

    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.queryByText('2')).not.toBeInTheDocument();
    expect(screen.queryByText('8')).not.toBeInTheDocument();
    expect(allButtons).toHaveLength(6);
  });

  it('adjusts page window at the start of pagination', () => {
    render(
      <Pagination currentPage={1} totalPages={20} onPageChange={vi.fn()} />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.queryByText('6')).not.toBeInTheDocument();
  });

  it('adjusts page window at the end of pagination', () => {
    render(
      <Pagination currentPage={20} totalPages={20} onPageChange={vi.fn()} />
    );

    expect(screen.getByText('16')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.queryByText('15')).not.toBeInTheDocument();
  });

  it('renders only 2 pages when totalPages is 2', () => {
    render(
      <Pagination currentPage={1} totalPages={2} onPageChange={vi.fn()} />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.queryByText('3')).not.toBeInTheDocument();
  });
});
