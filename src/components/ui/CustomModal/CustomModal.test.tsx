import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import CustomModal from './CustomModal';

beforeEach(() => {
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

describe('CustomModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    title: 'test title',
    description: 'test description',
    formType: 'controlled' as const,
  };

  it('renders modal when open', () => {
    render(<CustomModal {...defaultProps} />);
    expect(screen.getByText(/test title/i)).toBeInTheDocument();
    expect(screen.getByText(/test description/i)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<CustomModal {...defaultProps} />);
    const closeButton = screen.getAllByRole('button', { hidden: true })[0];
    fireEvent.click(closeButton);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('renders controlled form when formType is controlled', () => {
    render(<CustomModal {...defaultProps} formType="controlled" />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  });

  it('renders uncontrolled form when formType is uncontrolled', () => {
    render(<CustomModal {...defaultProps} formType="uncontrolled" />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  });
});
