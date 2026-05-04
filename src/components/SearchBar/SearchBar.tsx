import { Component } from 'react';
import CustomInput from '../UI/CustomInput/CustomInput.tsx';
import CustomButton from '../UI/CustomButton/CustomButton.tsx';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

class SearchBar extends Component<SearchBarProps> {
  render() {
    const { value, onChange, onSearch } = this.props;
    return (
      <div className="flex gap-2 max-w-1/2 grow">
        <CustomInput
          value={value}
          onChange={onChange}
          placeholder="Search..."
        />
        <CustomButton onClick={onSearch}>Catch!</CustomButton>
      </div>
    );
  }
}

export default SearchBar;
