'use client';

import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import { searchAction } from '../../app/[locale]/actions';
import CustomButton from '../UI/CustomButton/CustomButton.tsx';

type SearchFormProps = {
  initialValue: string;
};

const SearchForm = ({ initialValue }: SearchFormProps) => {
  const t = useTranslations('search');
  const [, formAction, isPending] = useActionState(searchAction, null);

  return (
    <form
      action={formAction}
      className="flex gap-2 sm:max-w-1/2 grow border rounded-lg p-2 border-gray-200 dark:border-gray-700"
    >
      <input
        type="text"
        name="q"
        defaultValue={initialValue}
        placeholder={t('placeholder')}
        className="w-full rounded border-gray-300 shadow-sm sm:text-sm px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-white
        dark:placeholder-gray-500 dark:focus:border-indigo-500
        dark:focus:ring-indigo-500"
      />
      <CustomButton disabled={isPending}>{t('submit')}</CustomButton>
    </form>
  );
};

export default SearchForm;
