import { ReactNode, useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { Collapse } from 'react-collapse';
import useActiveMenuItem from '@/hooks/useActiveMenuItem';
import { useNavigate } from '@tanstack/react-router';

type PropsWithOptionalChildren<P = unknown> = P & { children?: ReactNode };

interface SidebarItemProps {
  isSidebarOpen: boolean;
  icon: JSX.Element;
  label: string;
  exact?: boolean;
  link?: string;
  roles?: string[];
}

const SidebarItem = ({
  isSidebarOpen,
  icon,
  label,
  link,
  children,
  exact = false,
}: PropsWithOptionalChildren<SidebarItemProps>) => {
  const navigate = useNavigate();
  const isActive = useActiveMenuItem(link, exact, children);
  const [isOpen, setIsOpen] = useState(isActive);

  const handleClick = () => {
    if (link) {
      return void navigate({ to: link });
    }

    setIsOpen((prev) => !prev);
  };

  return (
    <li className="mx-2">
      <span
        onClick={handleClick}
        className={`group font-semibold flex flex-row items-center h-12 transform hover:translate-x-0.5 transition-transform ease-in duration-200 cursor-pointer rounded-lg ${
          isActive
            ? 'text-primary-500 bg-blue-50'
            : 'text-gray-500 hover:text-primary-500 hover:bg-blue-50'
        }`}
      >
        <span
          className={`inline-flex items-center justify-center h-12 w-12 text-lg transition duration-75 ${
            isActive ? 'text-primary-500' : 'text-gray-500'
          }`}
        >
          {icon}
        </span>
        {isSidebarOpen && (
          <div className="flex flex-1 items-center">
            <span
              className={`text-sm ${isActive ? 'font-semibold text-primary-500' : 'text-gray-500'}`}
            >
              {label}
            </span>
            {children && (
              <span className="ml-auto mr-2 text-gray-400">
                {isOpen ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            )}
          </div>
        )}
      </span>
      <Collapse isOpened={isOpen}>
        <ul className="flex flex-col bg-brand-header-bg">{children}</ul>
      </Collapse>
    </li>
  );
};

export default SidebarItem;
