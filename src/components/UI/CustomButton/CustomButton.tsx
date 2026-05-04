import { Component, type ReactNode } from 'react';

type Props = {
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
};

class CustomButton extends Component<Props> {
  render() {
    const { onClick, children, className = '' } = this.props;
    return (
      <button
        className={`rounded-sm border border-gray-200 px-3 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:z-10 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
}

export default CustomButton;
