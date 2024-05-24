import { ButtonHTMLAttributes } from 'react';

export type Size = 'xs' | 'sm' | 'md' | 'lg';

export interface DefaultButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  onClick?: () => void;
  bgColor?: string;
  bgColorHover?: string;
  textColor?: string;
  size?: Size;
  width?: string;
  border?: string;
  icon?: JSX.Element;
  rounded?: string;
}

const DefaultButton = ({
  label,
  disabled,
  onClick,
  bgColor,
  bgColorHover,
  textColor,
  size = 'md',
  width = 'flex w-full',
  border = 'border-transparent',
  icon,
  rounded = 'rounded-full',
  ...props
}: DefaultButtonProps) => {
  let sizingClasses = 'py-4 px-6 text-sm';

  if (size === 'xs') {
    sizingClasses = 'py-1 px-2 text-xs';
  } else if (size === 'sm') {
    sizingClasses = 'py-2 px-3 text-xs';
  } else if (size === 'md') {
    sizingClasses = 'py-3 px-4 text-sm';
  }

  const className = `group flex flex-row items-center align-middle relative ${width} justify-center border ${border} font-medium ${rounded}
  ${disabled ? 'text-gray-600' : textColor || 'text-white'} ${sizingClasses} 
  ${disabled ? 'bg-gray-200' : bgColor || 'bg-primary'}  ${
    disabled ? '' : bgColorHover || 'hover:bg-primary-600'
  } focus:outline-none transition duration-300`;

  return (
    <button
      onClick={onClick}
      className={className}
      disabled={disabled}
      {...props}
    >
      {icon}
      {label}
    </button>
  );
};

export default DefaultButton;
