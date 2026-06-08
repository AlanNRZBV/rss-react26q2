import type { ComponentProps } from 'react';

type CustomCheckboxProps = ComponentProps<'input'> & {
  label: string;
  error: string;
};

const CustomCheckbox = ({
  label,
  id,
  className = '',
  ref,
  error,
  ...props
}: CustomCheckboxProps) => {
  return (
    <label htmlFor={id} className={`flex flex-col cursor-pointer ${className}`}>
      <div className="flex items-center gap-4">
        <input
          ref={ref}
          type="checkbox"
          id={id}
          className="size-5 rounded border-gray-300 shadow-sm transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-900 dark:checked:bg-blue-600 dark:focus:ring-offset-gray-900"
          {...props}
        />
        <span className="font-medium text-gray-700 dark:text-gray-200 capitalize">
          {label}
        </span>
      </div>
      <span className="mt-1 block min-h-4 text-xs text-red-500 dark:text-red-400">
        {error}
      </span>
    </label>
  );
};

export default CustomCheckbox;
