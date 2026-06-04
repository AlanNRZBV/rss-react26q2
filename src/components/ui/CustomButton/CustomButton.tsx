import type { ComponentProps, FC } from 'react';

type ButtonVariant = 'contained' | 'text';
type CustomButtonProps = ComponentProps<'button'> & {
  title: string;
  variant?: ButtonVariant;
};

const variantStyles: Record<ButtonVariant, string> = {
  contained:
    'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900',
  text: 'border border-transparent bg-gray-800 text-white hover:bg-gray-900',
};

const CustomButton: FC<CustomButtonProps> = ({
  title,
  children,
  className = '',
  variant = 'contained',
  ...props
}) => {
  const baseStyles =
    'px-3 py-2 font-medium transition-colors focus:z-10 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 rounded-sm inline-flex items-center justify-center';

  const combinedClassName =
    `${baseStyles} ` + `${variantStyles[variant]} ` + `${className}`;

  return (
    <button type="button" className={combinedClassName} {...props}>
      {children}
      {title}
    </button>
  );
};

export default CustomButton;
