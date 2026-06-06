import type { ComponentProps } from 'react';

type CustomCheckboxProps = ComponentProps<'input'> & {
  label: string;
};

const CustomCheckbox = ({
  label,
  id,
  className = '',
  ref,
  ...props
}: CustomCheckboxProps) => {
  return (
    <label
      htmlFor={id}
      className={`inline-flex cursor-pointer items-center gap-3 ${className}`}
    >
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
    </label>
  );
};

export default CustomCheckbox;
