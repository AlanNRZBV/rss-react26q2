'use client';

import type { ComponentProps, FC, PropsWithChildren } from 'react';
import { Link, usePathname } from '../../../i18n/navigation';

type CustomLinkProps = PropsWithChildren<
  ComponentProps<typeof Link> & { className?: string }
>;

const CustomLink: FC<CustomLinkProps> = ({
  children,
  className = '',
  href,
  ...props
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      {...props}
      className={`inline-flex items-center rounded-sm border px-3 py-2 font-medium transition-colors focus:z-10 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none ${
        isActive
          ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800'
          : 'border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
      } ${className}`}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
