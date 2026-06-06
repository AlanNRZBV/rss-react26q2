import { z } from 'zod';
import { create } from 'zustand/react';

export const formSchema = z
  .object({
    name: z.string().min(2, 'Name is too short'),
    age: z.coerce.number().min(1, 'You can not be that young'),
    country: z.string(),
    gender: z.string(),
    email: z.string().refine((val) => {
      const parts = val.split('@');
      return (
        parts.length === 2 && parts[0].length > 0 && parts[1].includes('.')
      );
    }, 'Invalid email format'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least 1 uppercase letter')
      .regex(/[a-z]/, 'Must contain at least 1 lowercase letter')
      .regex(/[0-9]/, 'Must contain at least 1 number')
      .regex(/[^A-Za-z0-9]/, 'Must contain at least 1 special character'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    files: z.unknown(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type FormSchemaType = z.infer<typeof formSchema>;

type SubmitItem = {
  id: string;
  submission: FormSchemaType;
};

type FormStoreState = {
  submissions: SubmitItem[];
  actions: {
    addSubmission: (submissionData: FormSchemaType) => void;
    getSubmissions: () => SubmitItem[];
  };
};

export const useFormStore = create<FormStoreState>()((set, get) => ({
  submissions: [],
  actions: {
    addSubmission: (submissionData) =>
      set((state) => ({
        submissions: [
          ...state.submissions,
          {
            id: crypto.randomUUID(),
            submission: submissionData,
          },
        ],
      })),
    getSubmissions: () => get().submissions,
  },
}));

export const useFormActions = () => useFormStore((state) => state.actions);
export const useFormSubmissions = () =>
  useFormStore((state) => state.submissions);
