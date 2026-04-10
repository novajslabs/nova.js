import { useRef, useEffect } from "react";

/**
 * React hook to know whether the current render is the initial render.
 *
 * @returns {boolean} `true` only during the first render.
 */
export const useFirstRender = () => {
  const firstRender = useRef(true);

  useEffect(function markAfterFirstRender() {
    firstRender.current = false;
  }, []);

  return firstRender.current;
};
