import type { ComponentProps, FC } from 'react';

type ContainerProps = ComponentProps<'div'>;

const Container: FC<ContainerProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div
      id="container"
      className={`flex flex-col items-center p-4 min-h-screen dark:bg-gray-900 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
