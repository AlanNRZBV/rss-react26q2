import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import DataItem from './DataItem';
import { mockSubmission } from '../../tests/mocks';
import type { FormSchemaType } from '../../store/store';

describe('DataItem', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders all submission fields', () => {
    render(
      <DataItem
        submission={mockSubmission as unknown as FormSchemaType}
        createdAt={Date.now()}
      />
    );

    expect(screen.getByText(mockSubmission.name)).toBeInTheDocument();
    expect(screen.getByText(String(mockSubmission.age))).toBeInTheDocument();
    expect(screen.getByText(mockSubmission.email)).toBeInTheDocument();
    expect(screen.getByText(mockSubmission.country)).toBeInTheDocument();
    expect(screen.getByText(mockSubmission.gender)).toBeInTheDocument();
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockSubmission.files);
    expect(image).toHaveAttribute('alt', `Uploaded by ${mockSubmission.name}`);
  });

  it('removes the highlight after the timeout for a recent submission', () => {
    const { container } = render(
      <DataItem
        submission={mockSubmission as unknown as FormSchemaType}
        createdAt={Date.now()}
      />
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('border-green-400');

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(wrapper.className).not.toContain('border-green-400');
  });

  it('is not highlighted for an old submission', () => {
    const { container } = render(
      <DataItem
        submission={mockSubmission as unknown as FormSchemaType}
        createdAt={Date.now() - 5000}
      />
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).not.toContain('border-green-400');
  });
});
