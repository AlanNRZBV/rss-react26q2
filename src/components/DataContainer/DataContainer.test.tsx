import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import DataContainer from './DataContainer';
import { useFormActions } from '../../store/store';
import { mockSubmissionItem } from '../../tests/mocks';

vi.mock('../../store/store', async () => {
  const actual = (await vi.importActual('../../store/store')) as object;
  return {
    ...actual,
    useFormActions: vi.fn(),
  };
});

describe('DataContainer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when there are no submissions', () => {
    vi.mocked(useFormActions).mockReturnValue({
      addSubmission: vi.fn(),
      getSubmissions: () => [],
    });

    render(<DataContainer />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders a DataItem for each submission', () => {
    vi.mocked(useFormActions).mockReturnValue({
      addSubmission: vi.fn(),
      getSubmissions: () => [mockSubmissionItem],
    });

    render(<DataContainer />);

    expect(
      screen.getByText(mockSubmissionItem.submission.name)
    ).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
