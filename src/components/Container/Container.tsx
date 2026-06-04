import type { ComponentProps, FC } from 'react';

type ContainerProps = ComponentProps<'div'>;

const Container: FC<ContainerProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`flex items-center justify-center min-h-screen dark:bg-gray-800 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
