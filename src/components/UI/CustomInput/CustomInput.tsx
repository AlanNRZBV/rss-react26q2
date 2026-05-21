import type { FC } from 'react';

type CustomInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const CustomInput: FC<CustomInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded border-gray-300 shadow-sm sm:text-sm px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-white
  dark:placeholder-gray-500 dark:focus:border-indigo-500
  dark:focus:ring-indigo-500"
    />
  );
};

export default CustomInput;
