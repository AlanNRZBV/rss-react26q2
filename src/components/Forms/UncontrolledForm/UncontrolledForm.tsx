import CustomInput from '../../ui/CustomInput/CustomInput.tsx';
import CustomAutocomplete from '../../ui/CustomSelect/CustomAutocomplete.tsx';
import { GENDERS } from '../../../lib/constants/genders.ts';
import { COUNTRIES } from '../../../lib/constants/countries.ts';
import CustomCheckbox from '../../ui/CustomCheckbox/CustomCheckbox.tsx';
import CustomFileInput from '../../ui/CustomFileInput/CustomFileInput.tsx';
import CustomButton from '../../ui/CustomButton/CustomButton.tsx';
import { formSchema, useFormActions } from '../../../store/store.ts';
import * as React from 'react';
import { useState } from 'react';

const UncontrolledForm = () => {
  const { addSubmission } = useFormActions();

  const [errors, setErrors] = useState<Record<string, string>>({});

  console.log(errors);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);

    const rawValues = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      age: formData.get('age') as string,
      gender: formData.get('gender') as string,
      country: formData.get('country') as string,
      terms: formData.get('terms') === 'on',
      files: formData.get('files'),
    };

    console.log(rawValues.terms);
    console.log(formData.get('terms'));

    const result = await formSchema.safeParseAsync(rawValues);

    console.log('result.data', result.data);
    console.log('result.error', result.error);
    console.log('result.error.issues', result.error?.issues);

    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = String(issue.path[0]);
        if (!errs[key]) {
          errs[key] = issue.message;
        }
      });
      setErrors(errs);
      return;
    }

    addSubmission(result.data);
    setErrors({});
    formElement.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1 px-4">
      <CustomInput
        id="name"
        label="name"
        name="name"
        type="text"
        error={errors.name}
      />
      <CustomInput
        id="email"
        label="email"
        name="email"
        type="email"
        error={errors.email}
      />
      <CustomInput
        id="password"
        label="password"
        name="password"
        type="password"
        error={errors.password}
      />
      <CustomInput
        id="confirm-password"
        label="confirm password"
        name="confirmPassword"
        type="password"
        error={errors.confirmPassword}
      />
      <div className="flex justify-between gap-2">
        <CustomInput
          id="age"
          label="age"
          name="age"
          type="number"
          error={errors.age}
        />
        <CustomAutocomplete
          id="gender"
          label="gender"
          name="gender"
          error={errors.gender}
          options={GENDERS}
        />
        <CustomAutocomplete
          id="countries"
          label="country"
          options={COUNTRIES}
          name="country"
          error={errors.country}
        />
      </div>
      <CustomCheckbox
        id="terms"
        label="terms and conditions"
        name="terms"
        error={errors.terms}
      />
      <CustomFileInput label="upload" name="files" error={errors.files} />
      <CustomButton
        type="submit"
        className="uppercase self-center mt-4"
        title="submit"
      />
    </form>
  );
};

export default UncontrolledForm;
