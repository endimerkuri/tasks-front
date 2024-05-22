import { PropsWithChildren } from 'react';
import Sidebar from '@/hoc/partials/Sidebar';
import Header from '@/hoc/partials/Header';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='h-screen flex flex-row bg-gray-100'>
      <Sidebar />
      <div className='flex-1 overflow-y-auto overflow-x-hidden'>
        <Header />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
