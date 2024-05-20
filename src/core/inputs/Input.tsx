import { ReactElement, InputHTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  link?: string;
  to?: string;
  width?: string;
  border?: string;
  error?: string;
  value?: string;
  className?: string;
  height?: string;
  i?: ReactElement;
  disabled?: boolean;
  type?: string;
  required?: boolean;
}

const Input = ({
  label = '',
  id,
  error,
  value,
  disabled,
  type = 'text',
  height = 'h-11',
  placeholder = '',
  required = false,
  ...props
}: InputProps) => {
  const { t } = useTranslation() as { t: (key: string) => string };

  return (
    <div className="relative">
      <input
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        type={type}
        id={id}
        className={`block px-2.5 pt-9 pb-4 w-full mt-2 ${
          disabled ? 'bg-gray-100' : 'bg-transparent'
        } text-sm text-gray-900 rounded-lg border-1 ${
          error ? 'border border-red-500' : 'border'
        } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer ${height}`}
        {...props}
      />
      <label
        htmlFor={id}
        className={`absolute text-xs text-gray-800 duration-300 top-1.5 left-2 px-1 peer-focus:text-blue-600`}
      >
        {label} {required && '*'}
      </label>
      {error && <div className={`text-xs text-red-400 pt-1`}>{t(error)}</div>}
    </div>
  );
};

export default Input;
