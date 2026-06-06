import type { ComponentProps } from 'react';
import { capitalizeFirstLetter } from '../../../lib/utils/capitalizeFirstLetter.ts';

export type SelectOption = {
  value: string;
  label: string;
};

type CustomAutocompleteProps = ComponentProps<'input'> & {
  label: string;
  options: SelectOption[];
};

const CustomAutocomplete = ({
  label,
  id,
  className = '',
  options,
  ref,
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
          className={`mt-0.5 min-h-8 w-full rounded border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white ${className}`}
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
    </div>
  );
};

export default CustomAutocomplete;
