import CustomInput from '../UI/CustomInput/CustomInput.tsx';
import CustomButton from '../UI/CustomButton/CustomButton.tsx';
import type { FC } from 'react';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

const SearchBar: FC<SearchBarProps> = ({ value, onChange, onSearch }) => {
  return (
    <div className="flex gap-2 sm:max-w-1/2 grow border rounded-lg p-2 border-gray-200 dark:border-gray-700">
      <CustomInput value={value} onChange={onChange} placeholder="Search..." />
      <CustomButton onClick={onSearch}>Catch!</CustomButton>
    </div>
  );
};

export default SearchBar;
