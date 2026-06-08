import type { ComponentProps } from 'react';

type CustomFileInputProps = ComponentProps<'input'> & {
  label: string;
  error?: string;
};

const CustomFileInput = ({
  label,
  id,
  className = '',
  ref,
  error,
  ...props
}: CustomFileInputProps) => {
  return (
    <label
      htmlFor={id}
      className={`block cursor-pointer rounded border bg-white p-4 text-gray-900 shadow-sm transition-colors hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 sm:p-6 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 dark:focus-within:ring-offset-gray-900 ${
        error
          ? 'border-red-500 focus-within:ring-red-500'
          : 'border-gray-300 focus-within:ring-indigo-500 dark:border-gray-700'
      } ${className}`}
    >
      <div className="flex items-center justify-center gap-4">
        <span className="font-medium dark:text-white capitalize">{label}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
          />
        </svg>
      </div>
      <input
        accept="image/png, image/jpeg, image/jpg"
        ref={ref}
        type="file"
        id={id}
        className="sr-only"
        {...props}
      />
      <span className="mt-1 block min-h-4 text-xs text-red-500 dark:text-red-400">
        {error}
      </span>
    </label>
  );
};

export default CustomFileInput;
