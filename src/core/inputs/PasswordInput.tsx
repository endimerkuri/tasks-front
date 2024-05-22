import { InputHTMLAttributes, ReactElement, useState } from 'react';
import { PiEye, PiEyeClosed } from 'react-icons/pi';
import { useTranslation } from 'react-i18next';

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  className?: string;
  height?: string;
  containerClass?: string;
  i?: ReactElement;
}

const PasswordInput = ({
  label = 'Fjalëkalimi',
  error,
  containerClass,
  height = 'h-11',
  disabled,
  id,
  value,
  placeholder = '',
  ...props
}: PasswordInputProps) => {
  const { t } = useTranslation() as { t: (key: string) => string };
  const [show, setShow] = useState(false);

  const toggleVisibility = () => setShow((prevState) => !prevState);

  return (
    <div className={containerClass}>
      <div className='focus-within:text-primary-500'>
        <div className='relative'>
          <input
            value={value}
            placeholder={placeholder}
            type={show ? 'text' : 'password'}
            id={id}
            className={`block px-2.5 pt-9 pb-4  w-full ${
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
            {label}
          </label>
          <div
            onClick={toggleVisibility}
            className='absolute top-0 h-full right-4 flex justify-center items-center cursor-pointer'
          >
            {show ? (
              <PiEye className='w-6 h-6' />
            ) : (
              <PiEyeClosed className='w-6 h-6' />
            )}
          </div>
        </div>
      </div>
      {error && <div className={`text-xs text-red-400 pt-1`}>{t(error)}</div>}
    </div>
  );
};

export default PasswordInput;
