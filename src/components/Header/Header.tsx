import { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar.tsx';

class Header extends Component {
  render() {
    return (
      <div className="py-4 flex items-center justify-center">
        <SearchBar />
      </div>
    );
  }
}

export default Header;
