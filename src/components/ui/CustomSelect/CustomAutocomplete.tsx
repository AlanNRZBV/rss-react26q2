import type { ComponentProps } from 'react';
import { capitalizeFirstLetter } from '../../../lib/utils/capitalizeFirstLetter.ts';

export type SelectOption = {
  value: string;
  label: string;
};

type CustomAutocompleteProps = ComponentProps<'input'> & {
  label: string;
  error?: string;
  options: SelectOption[];
};

const CustomAutocomplete = ({
  label,
  id,
  className = '',
  options,
  ref,
  error,
  ...props
}: CustomAutocompleteProps) => {
  const capitalizedLabel = capitalizeFirstLetter(label);
  const dataListId = `${id}-list`;

  return (
    <div>
      <label htmlFor={id} className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {capitalizedLabel}
        </span>
        <input
          ref={ref}
          id={id}
          list={dataListId}
          className={`mt-0.5 min-h-8 w-full rounded border shadow-sm sm:text-sm focus-visible:outline-none focus-visible:ring-2 dark:bg-gray-900 dark:text-white ${
            error
              ? 'border-red-500 focus-visible:ring-red-500 dark:border-red-500'
              : 'focus-visible:ring-indigo-500 dark:border-gray-600'
          } ${className}`}
          {...props}
        />
      </label>
      <datalist id={dataListId}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </datalist>
      <span className="mt-1 block min-h-4 text-xs text-red-500 dark:text-red-400">
        {error}
      </span>
    </div>
  );
};

export default CustomAutocomplete;
