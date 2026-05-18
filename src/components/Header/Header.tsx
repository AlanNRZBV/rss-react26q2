import SearchBar from '../SearchBar/SearchBar.tsx';
import type { FC } from 'react';
import NavBar from '../NavBar/NavBar.tsx';
import BarContainer from '../UI/BarContainer/BarContainer.tsx';

type HeaderProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
};

const Header: FC<HeaderProps> = ({ searchTerm, onSearchChange, onSearch }) => {
  return (
    <BarContainer as="header" className="flex-col sm:flex-row gap-2 sm:gap-0">
      <NavBar />
      <SearchBar
        value={searchTerm}
        onChange={onSearchChange}
        onSearch={onSearch}
      />
    </BarContainer>
  );
};

export default Header;
