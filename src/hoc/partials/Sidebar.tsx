import { FaBuilding, FaRegCalendarCheck } from 'react-icons/fa';
import SidebarItem from '@/core/items/SidebarItem';
import logo from '@/assets/svg/logo-dark.svg';
import inlineLogo from '@/assets/svg/logo.svg';
import { BiMenu } from 'react-icons/bi';
import { Link } from '@tanstack/react-router';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const sidebarItems = (
    <div className="flex-1 overflow-auto flex flex-col justify-between scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full">
      <ul className="flex flex-col py-4 space-y-1">
        <SidebarItem
          isSidebarOpen={isOpen}
          icon={<FaBuilding />}
          label={'Test label'}
          link="/"
          exact
        />
        <SidebarItem
          isSidebarOpen={isOpen}
          icon={<FaRegCalendarCheck />}
          label="Reservations"
          link="/reservations"
        />
      </ul>
    </div>
  );

  return (
    <aside
      className={`${
        isOpen ? 'w-64' : 'w-16'
      } transition-w duration-300 h-full flex-col bg-white border-r hidden lg:flex`}
    >
      <div className="relative h-18 flex items-center justify-center my-2">
        <Link to="/" className="flex flex-col items-center justify-center my-4">
          <img
            src={isOpen ? logo : inlineLogo}
            alt="Logo"
            width={isOpen ? 190 : 35}
            className="fill-current"
          />
          <div className={'font-bold text-gray-800 text-sm mt-1.5'}>
            {'title'}
          </div>
        </Link>
        <BiMenu
          onClick={onToggle}
          className="absolute top-4 -right-8 text-gray-400 bg-white hover:text-gray-600 transition duration-300 rounded-full cursor-pointer z-10"
          size={16}
        />
      </div>
      {sidebarItems}
    </aside>
  );
};

export default Sidebar;
