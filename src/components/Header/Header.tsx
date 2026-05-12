import SearchBar from '../SearchBar/SearchBar.tsx';
import type { FC } from 'react';

type HeaderProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
};

const Header: FC<HeaderProps> = ({ searchTerm, onSearchChange, onSearch }) => {
  return (
    <header className="py-4 flex items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm px-6">
      <SearchBar
        value={searchTerm}
        onChange={onSearchChange}
        onSearch={onSearch}
      />
    </header>
  );
};

export default Header;
