import { Link, type LinkProps } from '@tanstack/react-router';
import type { FC, PropsWithChildren } from 'react';

type CustomLinkProps = PropsWithChildren<
  LinkProps & {
    className?: string;
  }
>;

const CustomLink: FC<CustomLinkProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <Link
      {...props}
      className={`inline-flex items-center rounded-sm border border-gray-200 px-3 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:z-10 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none ${className}`}
      activeProps={{
        className: 'bg-blue-50 text-blue-700 border-blue-200',
      }}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
