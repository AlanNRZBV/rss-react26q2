import { Component, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

class Layout extends Component<Props> {
  render() {
    return (
      <div className="w-full h-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 pt-4">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Layout;
