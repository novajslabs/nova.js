import { useState } from "react";

/**
 * React hook to store an array and expose common immutable array operations.
 *
 * @template T - The type of each array item.
 * @param {T[]} initialArray - Initial array value.
 * @returns {Object} An object with the current array and helper methods.
 * @returns {T[]} returns.array - The current array value.
 * @returns {React.Dispatch<React.SetStateAction<T[]>>} returns.set - React state setter for the full array.
 * @returns {(element: T) => void} returns.push - Appends an item to the end of the array.
 * @returns {(callback: (element: T) => boolean) => void} returns.filter - Replaces the array with the items that match the predicate.
 * @returns {(index: number, newElement: T) => void} returns.update - Replaces the item at the given index.
 * @returns {(index: number) => void} returns.remove - Removes the item at the given index.
 * @returns {() => void} returns.clear - Removes all items from the array.
 */
export const useArray = <T>(initialArray: T[]) => {
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
