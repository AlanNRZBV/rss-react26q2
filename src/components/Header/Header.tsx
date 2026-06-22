import type { FC } from 'react';
import NavBar from '../NavBar/NavBar.tsx';
import BarContainer from '../UI/BarContainer/BarContainer.tsx';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch.tsx';
import LangSwitcher from '../LangSwitcher/LangSwitcher.tsx';
import SearchForm from '../SearchBar/SearchForm.tsx';

type HeaderProps = {
  initialQuery: string;
};

const Header: FC<HeaderProps> = ({ initialQuery }) => {
  return (
    <BarContainer as="header" className="flex-col sm:flex-row gap-2 sm:gap-0">
      <NavBar />
      <SearchForm initialValue={initialQuery} />
      <LangSwitcher />
      <ThemeSwitch />
    </BarContainer>
  );
};

export default Header;
