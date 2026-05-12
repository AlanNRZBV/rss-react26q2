import type { FC, PropsWithChildren } from 'react';

type LayoutProps = PropsWithChildren;

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 pt-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;
