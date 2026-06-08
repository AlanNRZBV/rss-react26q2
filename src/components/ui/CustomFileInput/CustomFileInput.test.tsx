import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CustomFileInput from './CustomFileInput';

describe('CustomFileInput', () => {
  it('renders label and file input', () => {
    render(<CustomFileInput label="upload" id="file-input" />);
    expect(screen.getByLabelText(/upload/i)).toBeInTheDocument();
  });

  it('shows error message when provided', () => {
    render(
      <CustomFileInput label="upload" id="file-input" error="file error" />
    );
    expect(screen.getByText(/file error/i)).toBeInTheDocument();
  });
});
