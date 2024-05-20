// import React from 'react';
// import background from '@assets/images/background.jpg';

const AuthLayout = ({ children }: { children: any }) => (
  <div>
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-primary-700"
      style={{
        // backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-sm w-full space-y-8 p-8 bg-white border rounded-2xl shadow-xl">
        {children}
      </div>
    </div>
  </div>
);

export default AuthLayout;
