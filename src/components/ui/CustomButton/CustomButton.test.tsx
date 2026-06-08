import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import CustomButton from './CustomButton';

describe('CustomButton', () => {
  it('renders title', () => {
    render(<CustomButton title="click me" />);
    expect(
      screen.getByRole('button', { name: /click me/i })
    ).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <CustomButton>
        <span>child text</span>
      </CustomButton>
    );
    expect(screen.getByText(/child text/i)).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<CustomButton title="click me" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(onClick).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<CustomButton title="click me" disabled />);
    expect(screen.getByRole('button', { name: /click me/i })).toBeDisabled();
  });
});
