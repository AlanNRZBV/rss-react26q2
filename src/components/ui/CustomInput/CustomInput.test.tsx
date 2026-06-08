import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CustomInput from './CustomInput';

describe('CustomInput', () => {
  it('renders label and input', () => {
    render(<CustomInput label="test label" id="test-id" />);
    expect(screen.getByLabelText(/test label/i)).toBeInTheDocument();
  });

  it('shows error message when provided', () => {
    render(<CustomInput label="test label" id="test-id" error="test error" />);
    expect(screen.getByText(/test error/i)).toBeInTheDocument();
  });

  it('has aria-invalid set to true when error is present', () => {
    render(<CustomInput label="test label" id="test-id" error="test error" />);
    const input = screen.getByLabelText(/test label/i);
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });
});
