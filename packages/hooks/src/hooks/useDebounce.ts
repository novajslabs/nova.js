import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay: number) => {
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
