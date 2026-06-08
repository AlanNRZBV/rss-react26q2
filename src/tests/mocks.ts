import { vi } from 'vitest';

export const mockOnSuccess = vi.fn();
export const mockAddSubmission = vi.fn();

export const mockFormActions = {
  addSubmission: mockAddSubmission,
  getSubmissions: vi.fn(),
};

export const validFormData = {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'Password123!',
  confirmPassword: 'Password123!',
  age: '25',
  gender: 'male',
  country: 'United States',
  terms: true,
  files: new File(['hello'], 'hello.png', { type: 'image/png' }),
};

export const mockSubmission = {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'Password123!',
  confirmPassword: 'Password123!',
  age: 25,
  gender: 'male',
  country: 'United States',
  terms: true,
  files: 'data:image/png;base64,aGVsbG8=',
};

export const mockSubmissionItem = {
  id: 'item-1',
  createdAt: Date.now(),
  submission: mockSubmission,
};

export const stubFormDataWithFiles = () => {
  const RealFormData = globalThis.FormData;
  class FileFormData extends RealFormData {
    constructor(form?: HTMLFormElement) {
      super(form);
      if (form) {
        form.querySelectorAll('input[type="file"]').forEach((el) => {
          const input = el as HTMLInputElement;
          if (input.name && input.files && input.files.length > 0) {
            this.set(input.name, input.files[0]);
          }
        });
      }
    }
  }
  vi.stubGlobal('FormData', FileFormData);
};

export const restoreFormData = () => {
  vi.unstubAllGlobals();
};
