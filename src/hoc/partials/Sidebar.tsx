import SidebarItem from '@/core/items/SidebarItem';
import inlineLogo from '@/assets/svg/logo.png';
import { Link } from '@tanstack/react-router';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { BiBookOpen } from 'react-icons/bi';
import { HiOutlineCog6Tooth } from 'react-icons/hi2';
import { RiTimelineView } from 'react-icons/ri';

const Sidebar = () => {
  const sidebarItems = (
    <div className='flex-1 overflow-auto flex flex-col items-center scrollbar-thin lg:mt-56 scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full'>
      <ul className='flex flex-col space-y-1 gap-y-7'>
        <SidebarItem icon={<HiOutlineViewGrid />} link='/' exact />
        <SidebarItem icon={<RiTimelineView />} link='/login' />
        <SidebarItem icon={<BiBookOpen />} link='/signup' />
        <SidebarItem icon={<HiOutlineCog6Tooth />} link='/settings' />
      </ul>
    </div>
  );

  return (
    <aside
      className={
        'w-24 transition-w duration-300 h-full flex-col bg-primary-background lg:flex'
      }
    >
      <div className='relative h-18 flex items-center justify-center my-2'>
        <Link to='/' className='flex flex-col items-center justify-center my-4'>
          <img
            src={inlineLogo}
            alt='Logo'
            width={55}
            className='fill-current'
          />
          <div className={'font-bold text-gray-800 text-sm mt-1.5'}>
            CodeVider
          </div>
        </Link>
      </div>
      {sidebarItems}
    </aside>
  );
};

export default Sidebar;
