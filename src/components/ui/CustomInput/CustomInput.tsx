import { type ComponentProps } from 'react';
import { capitalizeFirstLetter } from '../../../lib/utils/capitalizeFirstLetter.ts';

type CustomInputProps = ComponentProps<'input'> & {
  label: string;
};

const CustomInput = ({
  label,
  id,
  className = '',
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
          ref={ref}
          id={id}
          className={`mt-0.5 min-h-8 w-full rounded border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white ${className}`}
          {...props}
        />
      </label>
    </div>
  );
};

export default CustomInput;
