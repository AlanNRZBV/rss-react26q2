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
      className="w-full rounded border-gray-300 shadow-sm sm:text-sm px-3 py-2"
    />
  );
};

export default CustomInput;
