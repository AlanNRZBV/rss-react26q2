import { type ComponentProps } from 'react';
import { capitalizeFirstLetter } from '../../../lib/utils/capitalizeFirstLetter.ts';

type CustomInputProps = ComponentProps<'input'> & {
  label: string;
  error?: string;
};

const CustomInput = ({
  label,
  id,
  className = '',
  error,
  ref,
  ...props
}: CustomInputProps) => {
  const capitalizedLabel = capitalizeFirstLetter(label);

  return (
    <div>
      <label htmlFor={id} className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {capitalizedLabel}
        </span>
        <input
          aria-invalid={!!error}
          ref={ref}
          id={id}
          className={`mt-0.5 min-h-8 w-full rounded border shadow-sm sm:text-sm focus-visible:outline-none focus-visible:ring-2 dark:bg-gray-900 dark:text-white ${
            error
              ? 'border-red-500 focus-visible:ring-red-500 dark:border-red-500'
              : 'border-gray-300 focus-visible:ring-indigo-500 dark:border-gray-600'
          } ${className}`}
          {...props}
        />
      </label>
      <span className="mt-1 block min-h-4 text-xs text-red-500 dark:text-red-400">
        {error}
      </span>
    </div>
  );
};

export default CustomInput;
