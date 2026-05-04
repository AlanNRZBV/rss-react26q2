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
      <div className="py-4 flex items-center justify-center">
        <SearchBar
          value={searchTerm}
          onChange={onSearchChange}
          onSearch={onSearch}
        />
      </div>
    );
  }
}

export default Header;
