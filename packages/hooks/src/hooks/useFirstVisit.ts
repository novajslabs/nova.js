import { useState } from "react";

/**
 * React hook to detect whether the user is visiting for the first time in the current browser.
 *
 * @returns {boolean} `true` when the `firstVisit` local storage key did not exist before this render.
 */
export const useFirstVisit = (): boolean => {
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(false);

  const firstVisit = localStorage.getItem("firstVisit");

  if (firstVisit === null) {
    localStorage.setItem("firstVisit", "true");
    setIsFirstVisit(true);
  }

  return isFirstVisit;
};
