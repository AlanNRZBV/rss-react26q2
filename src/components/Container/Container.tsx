import type { ComponentProps, FC } from 'react';

type ContainerProps = ComponentProps<'div'>;

const Container: FC<ContainerProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`flex items-center justify-center min-h-screen ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
