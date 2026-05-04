import { Component } from 'react';
import CustomInput from '../UI/CustomInput/CustomInput.tsx';
import CustomButton from '../UI/CustomButton/CustomButton.tsx';
import type { SearchBarState } from './SearchBar.types.ts';

const STORAGE_KEY = 'searchTerm';

class SearchBar extends Component<object, SearchBarState> {
  constructor(props: object) {
    super(props);
    const saved = localStorage.getItem(STORAGE_KEY) ?? '';
    this.state = { searchTerm: saved };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(value: string) {
    this.setState({ searchTerm: value });
  }

  handleSearch() {
    localStorage.setItem(STORAGE_KEY, this.state.searchTerm);
  }

  render() {
    return (
      <div className="flex gap-2 max-w-1/2 grow">
        <CustomInput
          value={this.state.searchTerm}
          onChange={this.handleChange}
          placeholder="Search..."
        />
        <CustomButton onClick={this.handleSearch}>Catch!</CustomButton>
      </div>
    );
  }
}

export default SearchBar;
