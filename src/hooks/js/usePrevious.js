import { useRef } from 'react';

export const usePrevious = (value) => {
  const currentRef = useRef(value);
  const previousRef = useRef(undefined);

  if (currentRef.current !== value) {
    previousRef.current = currentRef.current;
    currentRef.current = value;
  }

  return previousRef.current;
};
