import { useEffect, useRef, type RefObject } from "react";

/**
 * React hook to run a callback when a click happens outside the referenced element.
 *
 * @param {RefObject<HTMLElement | null>} ref - Ref attached to the element that defines the inside area.
 * @param {() => void} fn - Callback invoked when the click target is outside the referenced element.
 */
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
