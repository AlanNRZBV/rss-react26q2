import type { ComponentProps, FC } from 'react';

type ButtonVariant = 'contained' | 'outlined' | 'iconOnly';
type CustomButtonProps = ComponentProps<'button'> & {
  title?: string;
  variant?: ButtonVariant;
};

const variantStyles: Record<ButtonVariant, string> = {
  contained:
    'border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-200 dark:border-indigo-300 dark:bg-indigo-300 dark:text-gray-900 dark:hover:bg-indigo-200 dark:focus-visible:ring-indigo-700 text-sm font-semibold px-6 py-3 ',
  outlined:
    'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900 focus-visible:ring-slate-200 dark:border-slate-600 dark:bg-gray-900 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:focus-visible:ring-slate-700 text-sm font-semibold px-6 py-3 ',
  iconOnly: 'size-8',
};

const CustomButton: FC<CustomButtonProps> = ({
  title,
  children,
  className = '',
  variant = 'contained',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-full border  shadow-sm transition-colors focus-visible:ring-4 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50';

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
