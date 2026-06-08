import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CustomAutocomplete from './CustomAutocomplete';

const options = [
  { value: 'v1', label: 'Label 1' },
  { value: 'v2', label: 'Label 2' },
];

describe('CustomAutocomplete', () => {
  it('renders label and input with datalist', () => {
    render(
      <CustomAutocomplete label="select item" id="auto-id" options={options} />
    );
    expect(screen.getByLabelText(/select item/i)).toBeInTheDocument();
    const input = screen.getByLabelText(/select item/i);
    expect(input).toHaveAttribute('list', 'auto-id-list');
    expect(document.getElementById('auto-id-list')).toBeInTheDocument();
  });

  it('renders options in datalist', () => {
    render(
      <CustomAutocomplete label="select item" id="auto-id" options={options} />
    );
    const datalist = document.getElementById('auto-id-list');
    expect(datalist?.children).toHaveLength(2);
    expect(screen.getByText('Label 1')).toBeInTheDocument();
    expect(screen.getByText('Label 2')).toBeInTheDocument();
  });

  it('shows error message when provided', () => {
    render(
      <CustomAutocomplete
        label="select item"
        id="auto-id"
        options={options}
        error="auto error"
      />
    );
    expect(screen.getByText(/auto error/i)).toBeInTheDocument();
  });
});
