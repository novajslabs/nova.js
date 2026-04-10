import { useState } from "react";

/**
 * React hook to read and update `document.title`.
 *
 * @returns {Object} An object with the current title and a method to change it.
 * @returns {string} returns.title - Current document title.
 * @returns {(newTitle: string) => void} returns.changeTitle - Updates `document.title` and the hook state.
 */
export const useTitle = () => {
  const [title, setTitle] = useState<string>(document.title);

  const changeTitle = (newTitle: string) => {
    document.title = newTitle;
    setTitle(newTitle);
  };

  return { title, changeTitle };
};
