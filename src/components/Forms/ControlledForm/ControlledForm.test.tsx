import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import ControlledForm from './ControlledForm';
import { useFormActions } from '../../../store/store';
import {
  mockOnSuccess,
  mockAddSubmission,
  validFormData,
  mockFormActions,
} from '../../../tests/mocks';

vi.mock('../../../store/store', async () => {
  const actual = (await vi.importActual('../../../store/store')) as object;
  return {
    ...actual,
    useFormActions: vi.fn(),
  };
});
const createFileList = (file: File): FileList => {
  const fileList: Record<string, unknown> = {
    0: file,
    length: 1,
    item: (index: number) => (index === 0 ? file : null),
  };
  Object.setPrototypeOf(fileList, FileList.prototype);
  return fileList as unknown as FileList;
};

const setFileInput = (input: HTMLElement, file: File) => {
  Object.defineProperty(input, 'files', {
    value: createFileList(file),
    configurable: true,
  });
  fireEvent.change(input);
};

const fillValidForm = () => {
  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: validFormData.name },
  });
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: validFormData.email },
  });
  fireEvent.change(screen.getByLabelText(/^password$/i), {
    target: { value: validFormData.password },
  });
  fireEvent.change(screen.getByLabelText(/confirm password/i), {
    target: { value: validFormData.confirmPassword },
  });
  fireEvent.change(screen.getByLabelText(/age/i), {
    target: { value: validFormData.age },
  });
  fireEvent.change(screen.getByLabelText(/gender/i), {
    target: { value: validFormData.gender },
  });
  fireEvent.change(screen.getByLabelText(/country/i), {
    target: { value: validFormData.country },
  });
  fireEvent.click(screen.getByLabelText(/terms and conditions/i));
  setFileInput(screen.getByLabelText(/upload/i), validFormData.files);
};

describe('ControlledForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useFormActions).mockReturnValue(mockFormActions);
  });

  it('renders all form fields', () => {
    render(<ControlledForm onSuccess={mockOnSuccess} />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/password/i)).toHaveLength(2);
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/terms and conditions/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/upload/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields on blur or change', async () => {
    render(<ControlledForm onSuccess={mockOnSuccess} />);
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'a' },
    });

    await waitFor(() => {
      expect(screen.getByText(/name is too short/i)).toBeInTheDocument();
    });
  });

  it('successfully submits form with valid data', async () => {
    render(<ControlledForm onSuccess={mockOnSuccess} />);

    fillValidForm();

    const submitButton = screen.getByRole('button', { name: /submit/i });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAddSubmission).toHaveBeenCalled();
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('shows error if passwords do not match', async () => {
    render(<ControlledForm onSuccess={mockOnSuccess} />);

    fillValidForm();
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'Different123!' },
    });

    const form = screen
      .getByRole('button', { name: /submit/i })
      .closest('form') as HTMLFormElement;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/passwords don't match/i)).toBeInTheDocument();
    });
  });
});
