/**
 * usePrevious.ts
 *
 * The usePrevious is a custom hook that allows a component to keep track of the previous
 * value of a variable. This is useful when you want to compare the current value of a variable
 * with its previous value.
 */

import { useRef } from 'react';

export default function usePrevious<T>(value: T): T | undefined {
  const currentRef = useRef<T>(value);
  const previousRef = useRef<T>();

  if (currentRef.current !== value) {
    previousRef.current = currentRef.current;
    currentRef.current = value;
  }

  return previousRef.current;
}
