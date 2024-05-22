import { useRef, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { FiChevronDown } from 'react-icons/fi';
import { removeAuth } from '@/redux/slices/auth';
import { useNavigate } from '@tanstack/react-router';
import { flushSync } from 'react-dom';
import { initials, removeMe } from '@/redux/slices/me';
import { useDispatch, useSelector } from 'react-redux';
import useClickOutside from '@/hooks/useClickOutside';

const UserDropdown = () => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const userInitials = useSelector(initials);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleVisibility = () => setIsOpen((prev) => !prev);

  const handleLogout = () => {
    flushSync(() => {
      dispatch(removeAuth({}));
      dispatch(removeMe({}));
    });

    void navigate({ to: '/login' });
  };

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <>
      <div ref={dropdownRef} className='inline-flex bg-white rounded-md'>
        <div
          onClick={toggle}
          className={`p-2 text-2xl ${
            isOpen ? 'text-primary-800' : 'text-gray-600'
          } hover:text-white hover:bg-primary bg-primary-10 rounded-full font-semibold uppercase cursor-pointer`}
        >
          {userInitials}
        </div>
        <div className='relative rounded-full'>
          <button
            onClick={toggleVisibility}
            type='button'
            className='inline-flex items-center rounded-full justify-center h-full px-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50'
          >
            <FiChevronDown className='text-primary' size={24} />
          </button>
          {isOpen && (
            <div className='absolute right-0 z-10 w-44 mt-2 origin-top-right bg-white border border-gray-100 rounded-lg shadow-lg'>
              <div
                onClick={handleLogout}
                className='flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 text-left cursor-pointer rounded-lg mx-1 my-1'
              >
                <AiOutlineLogout className='mr-2' />
                Log out
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserDropdown;
