import { PropsWithChildren } from 'react';

const Card = ({ children, ...props }: PropsWithChildren) => {
  return (
    <div {...props} className='w-full'>
      <div className='bg-white rounded-2xl shadow-even justify-between items-center'>
        {children}
      </div>
    </div>
  );
};

export default Card;
