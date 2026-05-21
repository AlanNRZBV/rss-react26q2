import type { FC, ReactNode, ElementType } from 'react';

interface BarContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

const BarContainer: FC<BarContainerProps> = ({
  children,
  className = '',
  as: Component = 'div',
}) => {
  return (
    <Component
      className={`py-4 flex items-center justify-between rounded-2xl border border-gray-200 bg-white shadow-sm px-6 dark:border-gray-800 dark:bg-gray-900 ${className}`}
    >
      {children}
    </Component>
  );
};

export default BarContainer;
