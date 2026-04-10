import { useEffect, useState } from "react";

/**
 * React hook to delay updates to a value until a given amount of time has passed.
 *
 * @template T - The type of the value to debounce.
 * @param {T} value - Value to debounce.
 * @param {number} delay - Debounce delay in milliseconds.
 * @returns {T} The debounced value.
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(
    function syncDebouncedValue() {
      const handleTimeout = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => clearTimeout(handleTimeout);
    },
    [value, delay],
  );

  return debouncedValue;
};
