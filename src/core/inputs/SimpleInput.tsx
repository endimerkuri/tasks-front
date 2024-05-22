import { InputHTMLAttributes, ReactElement } from 'react';
import { IconType } from 'react-icons/lib';

interface SimpleInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  value?: string;
  height?: string;
  type?: string;
  className?: string;
  icon?: ReactElement<IconType> | null;
}

const SimpleInput = ({
  id,
  label = '',
  value,
  type = 'text',
  height = 'h-11',
  className = '',
  placeholder = '',
  ...props
}: SimpleInputProps) => {
  return (
    <div className='relative'>
      <label
        htmlFor={id}
        className={`text-md text-gray-800 duration-300 top-1.5 left-2 px-1 peer-focus:text-blue-600`}
      >
        {label}
      </label>
      {props.icon && (
        <div className='absolute bottom-2.5 left-4 flex items-end text-gray-600'>
          {props.icon}
        </div>
      )}
      <input
        placeholder={placeholder}
        value={value}
        type={type}
        id={id}
        className={`block p-2.5 w-full mt-2 bg-transparent
text-md text-gray-600 rounded-lg border-1 border ${className} ${props.icon && 'pl-12'}
appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer ${height}`}
        {...props}
      />
    </div>
  );
};

export default SimpleInput;
