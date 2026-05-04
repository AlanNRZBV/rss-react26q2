import { Component } from 'react';

type Props = {
  onClick?: () => void;
  children?: React.ReactNode;
};

class CustomButton extends Component<Props> {
  render() {
    const { onClick, children } = this.props;
    return <button onClick={onClick}>{children}</button>;
  }
}

export default CustomButton;
