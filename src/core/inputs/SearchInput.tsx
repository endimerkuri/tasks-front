import { CiSearch } from 'react-icons/ci';
import React from 'react';

interface SearchInputProps {
  id?: string;
  onKeyUp: (value: string) => void;
  placeholder?: string;
  extraClasses?: string;
  containerClass?: string;
}

const SearchInput = ({
  id,
  onKeyUp,
  placeholder,
  extraClasses = '',
  containerClass = 'w-60',
}: SearchInputProps) => {
  return (
    <div className={`relative ${containerClass}`}>
      <input
        id={id}
        className={`${extraClasses} h-12 pl-3 pr-8 rounded-md text-sm bg-gray-100 transition duration-300 focus:bg-white focus:border-gray-300 focus:shadow-sm focus:outline-none w-full`}
        placeholder={placeholder}
        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
          onKeyUp(e.currentTarget.value)
        }
      />
      <div className='absolute top-0 h-full right-3 text-lg flex items-center text-gray-400'>
        <CiSearch />
      </div>
    </div>
  );
};

export default SearchInput;
