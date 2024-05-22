import { ReactNode } from 'react';
import useActiveMenuItem from '@/hooks/useActiveMenuItem';
import { useNavigate } from '@tanstack/react-router';

type PropsWithOptionalChildren<P = unknown> = P & { children?: ReactNode };

interface SidebarItemProps {
  icon: JSX.Element;
  exact?: boolean;
  link?: string;
}

const SidebarItem = ({
  icon,
  link,
  children,
  exact = false,
}: PropsWithOptionalChildren<SidebarItemProps>) => {
  const navigate = useNavigate();
  const isActive = useActiveMenuItem(link, exact, children);

  const handleClick = () => {
    if (link) {
      return void navigate({ to: link });
    }
  };

  return (
    <li className='m-2'>
      <span
        onClick={handleClick}
        className={`rounded-2xl inline-flex items-center hover:scale-125 justify-center h-12 w-12 text-3xl transition duration-150 ease-in-out ${
          isActive
            ? 'text-white bg-primary shadow-2xl'
            : 'text-gray-500 hover:bg-gray-200 hover:text-gray-700'
        }`}
      >
        {icon}
      </span>
    </li>
  );
};

export default SidebarItem;
