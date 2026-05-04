import { Component } from 'react';
import type { CustomInputProps } from './CustomInput.types.ts';

class CustomInput extends Component<CustomInputProps> {
  render() {
    const { value, onChange, placeholder } = this.props;
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded border-gray-300 shadow-sm sm:text-sm px-3 py-2"
      />
    );
  }
}

export default CustomInput;
