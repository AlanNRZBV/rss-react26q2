import { useForm, type SubmitHandler } from 'react-hook-form';
import { type FC } from 'react';
import { z } from 'zod';
import CustomInput from '../../ui/CustomInput/CustomInput.tsx';
import CustomCheckbox from '../../ui/CustomCheckbox/CustomCheckbox.tsx';
import CustomFileInput from '../../ui/CustomFileInput/CustomFileInput.tsx';
import CustomButton from '../../ui/CustomButton/CustomButton.tsx';
import { GENDERS } from '../../../lib/constants/genders.ts';
import { COUNTRIES } from '../../../lib/constants/countries.ts';
import { formSchema, useFormActions } from '../../../store/store.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomAutocomplete from '../../ui/CustomAutocomplete/CustomAutocomplete.tsx';

type FormInput = z.input<typeof formSchema>;
type FormOutput = z.output<typeof formSchema>;
type ControlledFormProps = {
  onSuccess: () => void;
};

const ControlledForm: FC<ControlledFormProps> = ({ onSuccess }) => {
  const { addSubmission } = useFormActions();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      country: undefined,
      gender: undefined,
      terms: false,
    },
  });

  const onSubmit: SubmitHandler<FormOutput> = (data) => {
    addSubmission(data);
    reset();
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-1 px-4"
    >
      <CustomInput
        id="name"
        label="name"
        type="text"
        error={errors.name?.message}
        {...register('name')}
      />
      <CustomInput
        id="email"
        label="email"
        type="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <CustomInput
        id="password"
        label="password"
        type="password"
        error={errors.password?.message}
        {...register('password')}
      />
      <CustomInput
        id="confirm-password"
        label="confirm password"
        type="password"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />
      <div className="flex justify-between gap-2">
        <CustomInput
          id="age"
          label="age"
          type="number"
          error={errors.age?.message}
          {...register('age')}
        />
        <CustomAutocomplete
          id="gender"
          label="gender"
          options={GENDERS}
          error={errors.gender?.message}
          {...register('gender')}
        />
        <CustomAutocomplete
          id="countries"
          label="country"
          options={COUNTRIES}
          error={errors.country?.message}
          {...register('country')}
        />
      </div>
      <CustomCheckbox
        id="terms"
        label="terms and conditions"
        error={errors.terms?.message ?? ''}
        {...register('terms')}
      />
      <CustomFileInput
        id="files"
        label="upload"
        error={errors.files?.message}
        {...register('files')}
      />
      <CustomButton
        type="submit"
        className="uppercase self-center mt-4"
        title="submit"
        disabled={!isValid}
      />
    </form>
  );
};

export default ControlledForm;
