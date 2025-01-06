import React from 'react';

const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <React.Fragment>
      <div className='bg-gray-100 h-screen flex items-center justify-center'>
        <div className='bg-white bg-opacity-8 p-8 shadow-lg rounded-lg w-[80%] max-w-[45rem]'>
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default AppLayout;
