import type { ComponentProps, FC } from 'react';

type CustomButtonProps = ComponentProps<'button'> & {
  title: string;
};

const CustomButton: FC<CustomButtonProps> = ({
  title,
  children,
  className = '',
  ...props
}) => {
  return (
    <button
      type="button"
      className={`px-8 py-3 font-semibold rounded dark:bg-gray-800 dark:text-gray-100 ${className}`}
      {...props}
    >
      {children}
      {title}
    </button>
  );
};

export default CustomButton;
