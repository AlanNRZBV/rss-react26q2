import { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar.tsx';

type Props = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
};

class Header extends Component<Props> {
  render() {
    const { searchTerm, onSearchChange, onSearch } = this.props;
    return (
      <header className="py-4 flex items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm px-6">
        <SearchBar
          value={searchTerm}
          onChange={onSearchChange}
          onSearch={onSearch}
        />
      </header>
    );
  }
}

export default Header;
