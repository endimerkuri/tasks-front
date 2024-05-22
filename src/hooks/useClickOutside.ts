import { RefObject, useEffect } from 'react';

const useClickOutside = (
  ref: RefObject<HTMLElement>,
  onClickOutside: () => void,
) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClickOutside]);
};

export default useClickOutside;
