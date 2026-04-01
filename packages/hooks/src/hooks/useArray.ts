import { useState } from "react";

/**
 * React hook to manage and manipulate arrays.
 *
 * @template T - The type of the array.
 *
 * @param {T[]} initialArray - The array to manage and manipulate.
 *
 * @returns {Object} An object with the array state and manipulation methods.
 * @returns {T[]} returns.array - The current array state.
 * @returns {React.Dispatch<React.SetStateAction<T[]>>} returns.set - Directly sets the array state.
 * @returns {(element: T) => void} returns.push - Appends an element to the end of the array.
 * @returns {(callback: (element: T) => boolean) => void} returns.filter - Filters the array using a callback function.
 * @returns {(index: number, newElement: T) => void} returns.update - Replaces the element at the given index with a new element.
 * @returns {(index: number) => void} returns.remove - Removes the element at the given index.
 * @returns {() => void} returns.clear - Empties the array.
 *
 * @example
 * const { array, push, remove, clear } = useArray<string>([]);
 *
 * push("hello");   // ["hello"]
 * push("world");   // ["hello", "world"]
 * remove(0);       // ["world"]
 * clear();         // []
 */
export const useArray = <T>(initialArray: T[]): object => {
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
      ...prev.slice(index + 1, prev.length),
    ]);
  };

  const remove = (index: number) => {
    setArray((prev) => [...prev.slice(0, index), ...prev.slice(index + 1, prev.length)]);
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
    clear,
  };
};
