import { useState } from "react";

/**
 * React hook to manage an input value and expose a ready-to-use change handler.
 *
 * @template T - The value type stored in state.
 * @param {T} initialValue - Initial input value.
 * @returns {Object} An object with the current input value and a change handler.
 * @returns {T} returns.inputValue - Current input value.
 * @returns {(event: React.ChangeEvent<HTMLInputElement>) => void} returns.onInputChange - Updates the state from an input change event.
 */
export const useInput = <T>(initialValue: T) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value as unknown as T);
  };

  return { inputValue, onInputChange };
};
