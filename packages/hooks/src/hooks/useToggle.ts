import { useState } from "react";

/**
 * React hook to store a boolean value and toggle it.
 *
 * @param {boolean} initialValue - Initial boolean state.
 * @returns {Object} An object with the current value and a toggle handler.
 * @returns {boolean} returns.current - Current boolean state.
 * @returns {() => void} returns.handleToggle - Inverts the current boolean state.
 */
export const useToggle = (initialValue: boolean) => {
  const [current, setCurrent] = useState(initialValue);

  const handleToggle = () => setCurrent((prev) => !prev);

  return { current, handleToggle };
};
