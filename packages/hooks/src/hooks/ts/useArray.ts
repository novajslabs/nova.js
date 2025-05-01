import { useState } from 'react';

export default function useArray<T>(initialArray: T[]) {
  const [array, setArray] = useState<T[]>(initialArray);

  const push = (element: T) => {
    setArray((prev) => [...prev, element]);
  };

  const filter = (callback: (element: T) => boolean) => {
    setArray((prev) => prev.filter(callback));
  };

  const update = (index: number, newElement: T) => {
    setArray((prev) => [
      ...prev.slice(0, index),
      newElement,
      ...prev.slice(index + 1, prev.length)
    ]);
  };

  const remove = (index: number) => {
    setArray((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1, prev.length)
    ]);
  };

  const clear = () => {
    setArray([]);
  };

  return {
    array,
    set: setArray,
    push,
    filter,
    update,
    remove,
    clear
  };
}
