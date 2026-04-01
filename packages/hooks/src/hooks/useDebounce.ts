import { useEffect, useState } from "react";

/**
 * React hook to delay the execution of function or state update.
 *
 * @template T - The type of the value to debounce.
 *
 * @param {T} value - The value to debounce.
 * @param {number} delay - The debounce delay in milliseconds.
 *
 * @returns {T} The debounced value.
 *
 * @example
 * const [search, setSearch] = useState("");
 * const debouncedSearch = useDebounce(search, 500);
 *
 * useEffect(() => {
 *   fetchResults(debouncedSearch);
 * }, [debouncedSearch]);
 *
 * return <input value={search} onChange={(e) => setSearch(e.target.value)} />;
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
