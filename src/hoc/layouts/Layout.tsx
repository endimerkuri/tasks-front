import { PropsWithChildren, useState } from 'react';
import Sidebar from '@/hoc/partials/Sidebar';
import Header from '@/hoc/partials/Header';

const Layout = ({ children }: PropsWithChildren) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  return (
    <div className="h-screen flex flex-row bg-gray-100">
      <Sidebar
        isOpen={showSidebar}
        onToggle={() => setShowSidebar((prev) => !prev)}
      />
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <Header />
        <div className="m-6">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
