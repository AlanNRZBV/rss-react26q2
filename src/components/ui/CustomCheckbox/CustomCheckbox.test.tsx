import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CustomCheckbox from './CustomCheckbox';

describe('CustomCheckbox', () => {
  it('renders label and checkbox', () => {
    render(<CustomCheckbox label="test label" id="test-id" error="" />);
    expect(screen.getByLabelText(/test label/i)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('shows error message when provided', () => {
    render(
      <CustomCheckbox label="test label" id="test-id" error="test error" />
    );
    expect(screen.getByText(/test error/i)).toBeInTheDocument();
  });
});
