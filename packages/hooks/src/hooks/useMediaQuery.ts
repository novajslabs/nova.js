import { useSyncExternalStore } from "react";

const getMediaQueryServerSnapshot = () => false;

const getMediaQuerySnapshot = (query: string) => {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(query).matches;
};

const subscribeToMediaQuery = (query: string, onStoreChange: () => void) => {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const mediaQueryList = window.matchMedia(query);
  mediaQueryList.addEventListener("change", onStoreChange);

  return () => {
    mediaQueryList.removeEventListener("change", onStoreChange);
  };
};

/**
 * React hook to track whether the current window matches a CSS media query.
 *
 * @param {string} query - Media query string passed to `window.matchMedia`.
 * @returns {boolean} `true` when the provided media query currently matches.
 */
export const useMediaQuery = (query: string): boolean => {
  return useSyncExternalStore(
    (onStoreChange) => subscribeToMediaQuery(query, onStoreChange),
    () => getMediaQuerySnapshot(query),
    getMediaQueryServerSnapshot,
  );
};
