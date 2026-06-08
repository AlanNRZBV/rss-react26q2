import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import UncontrolledForm from './UncontrolledForm';
import { useFormActions } from '../../../store/store';
import {
  mockOnSuccess,
  mockAddSubmission,
  validFormData,
  mockFormActions,
  stubFormDataWithFiles,
  restoreFormData,
} from '../../../tests/mocks';

vi.mock('../../../store/store', async () => {
  const actual = (await vi.importActual('../../../store/store')) as object;
  return {
    ...actual,
    useFormActions: vi.fn(),
  };
});

describe('UncontrolledForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useFormActions).mockReturnValue(mockFormActions);
    stubFormDataWithFiles();
  });

  afterEach(() => {
    restoreFormData();
  });

  it('renders all form fields', () => {
    render(<UncontrolledForm onSuccess={mockOnSuccess} />);

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

  it('shows validation errors on submit for empty fields', async () => {
    render(<UncontrolledForm onSuccess={mockOnSuccess} />);

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/name is too short/i)).toBeInTheDocument();
      expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
    });
  });

  it('successfully submits form with valid data', async () => {
    const user = userEvent.setup();
    render(<UncontrolledForm onSuccess={mockOnSuccess} />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: validFormData.name, name: 'name' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: validFormData.email, name: 'email' },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: validFormData.password, name: 'password' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: validFormData.confirmPassword, name: 'confirmPassword' },
    });
    fireEvent.change(screen.getByLabelText(/age/i), {
      target: { value: validFormData.age, name: 'age' },
    });
    fireEvent.change(screen.getByLabelText(/gender/i), {
      target: { value: validFormData.gender, name: 'gender' },
    });
    fireEvent.change(screen.getByLabelText(/country/i), {
      target: { value: validFormData.country, name: 'country' },
    });
    fireEvent.click(screen.getByLabelText(/terms and conditions/i));

    await user.upload(screen.getByLabelText(/upload/i), validFormData.files);

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockAddSubmission).toHaveBeenCalled();
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('shows error if passwords do not match', async () => {
    const user = userEvent.setup();
    render(<UncontrolledForm onSuccess={mockOnSuccess} />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: validFormData.name, name: 'name' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: validFormData.email, name: 'email' },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: validFormData.password, name: 'password' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'Different123!', name: 'confirmPassword' },
    });
    fireEvent.change(screen.getByLabelText(/age/i), {
      target: { value: validFormData.age, name: 'age' },
    });
    fireEvent.change(screen.getByLabelText(/gender/i), {
      target: { value: validFormData.gender, name: 'gender' },
    });
    fireEvent.change(screen.getByLabelText(/country/i), {
      target: { value: validFormData.country, name: 'country' },
    });
    fireEvent.click(screen.getByLabelText(/terms and conditions/i));

    await user.upload(screen.getByLabelText(/upload/i), validFormData.files);

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/passwords don't match/i)).toBeInTheDocument();
    });
  });
});
