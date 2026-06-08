import { z } from 'zod';
import { create } from 'zustand/react';
import { convertToBase64 } from '../lib/utils/convertToBase64.ts';
import { GENDERS } from '../lib/constants/genders.ts';
import { COUNTRIES } from '../lib/constants/countries.ts';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const GENDER_VALUES = GENDERS.map((item) => item.value);
const COUNTRY_VALUES = COUNTRIES.map((item) => item.value);

export const formSchema = z
  .object({
    name: z.string().min(2, 'Name is too short'),
    age: z.coerce.number().min(1, 'You can not be that young'),
    country: z.enum(COUNTRY_VALUES, {
      message: 'Please select a valid country',
    }),
    gender: z.enum(GENDER_VALUES, { message: 'Please select a valid gender' }),
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
    files: z
      .instanceof(File, { message: 'Please upload an image' })
      .refine((file) => file.size > 0, 'Please upload an image')
      .refine(
        (file) => file.size <= MAX_FILE_SIZE,
        `File size must not exceed ${MAX_FILE_SIZE / 1024 / 1024}MB`
      )
      .refine(
        (file) => IMAGE_TYPES.includes(file.type),
        'Only JPEG and PNG files are allowed'
      )
      .transform((file) => convertToBase64(file)),
    terms: z.coerce.boolean().refine((val) => val, {
      message: 'You must accept the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type FormSchemaType = z.infer<typeof formSchema>;

type SubmitItem = {
  id: string;
  createdAt: number;
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
            createdAt: Date.now(),
            submission: submissionData,
          },
        ],
      })),
    getSubmissions: () => get().submissions,
  },
}));

export const useFormActions = () => useFormStore((state) => state.actions);
