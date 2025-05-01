import { useEffect, RefObject } from 'react';

export const useOutsideClick = (
  ref: RefObject<HTMLElement | null>,
  fn: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        fn();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, fn]);
};
