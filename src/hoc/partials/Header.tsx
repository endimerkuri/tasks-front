import UserDropdown from '@/hoc/partials/UserDropdown';
import SearchInput from '@/core/inputs/SearchInput';

const Header = () => {
  return (
    <nav className='sticky top-0 bg-white z-10'>
      <div className='relative items-center h-14 lg:h-[76px] flex'>
        <div className='flex w-full justify-between mx-4 items-center'>
          <div />
          <SearchInput
            containerClass='w-80'
            placeholder='Search anything...'
            onKeyUp={() => {}}
          />
          <UserDropdown />
        </div>
      </div>
    </nav>
  );
};

export default Header;
