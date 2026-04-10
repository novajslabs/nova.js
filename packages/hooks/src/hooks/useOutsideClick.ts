import { useEffect, useRef, type RefObject } from "react";

export const useOutsideClick = (ref: RefObject<HTMLElement | null>, fn: () => void) => {
  const callbackRef = useRef(fn);
  callbackRef.current = fn;

  useEffect(
    function syncOutsideClick() {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          callbackRef.current();
        }
      };

      document.addEventListener("click", handleClickOutside);

      return function cleanupOutsideClick() {
        document.removeEventListener("click", handleClickOutside);
      };
    },
    [ref],
  );
};
