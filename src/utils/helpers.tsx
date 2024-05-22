import toast from 'react-hot-toast';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';

export const showSuccess = (message = 'Success', timeout = 2000) => {
  toast(message, {
    id: 'success-toast',
    position: 'top-center',
    icon: <HiCheckCircle className='text-emerald-500 h-5' />,
    className:
      'text-xs sm:text-sm leading-5 font-medium text-green-600 lg:max-w-md 2xl:max-w-lg',
    duration: timeout,
  });
};

export const showError = (error: string, timeout = 2000) => {
  toast(error, {
    id: 'error-toast',
    position: 'top-center',
    icon: <HiXCircle className='text-red-500 h-5' />,
    className:
      'text-xs sm:text-sm leading-5 font-medium text-red-600 lg:max-w-md 2xl:max-w-lg',
    duration: timeout,
  });
};
