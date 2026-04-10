import { useState, useLayoutEffect } from "react";

/**
 * React hook to track the current window scroll position and expose `window.scrollTo`.
 *
 * @returns {Object} An object with the current scroll position and the browser scroll function.
 * @returns {{ x: number; y: number }} returns.position - Current horizontal and vertical scroll coordinates.
 * @returns {typeof window.scrollTo} returns.scrollTo - Native `window.scrollTo` function.
 */
export const useScroll = () => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const handleScroll = () => {
    setPosition({
      x: window.scrollX,
      y: window.scrollY,
    });
  };

  useLayoutEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { position, scrollTo: window.scrollTo };
};
