import { useRef } from "react";

/**
 * React hook to read the previous value from the prior render.
 *
 * @template T - The tracked value type.
 * @param {T} value - Current value.
 * @returns {T | undefined} The previous value, or `undefined` during the first render.
 */
export const usePrevious = <T>(value: T): T | undefined => {
  const currentRef = useRef<T>(value);
  const previousRef = useRef<T>(undefined);

  if (currentRef.current !== value) {
    previousRef.current = currentRef.current;
    currentRef.current = value;
  }

  return previousRef.current;
};
