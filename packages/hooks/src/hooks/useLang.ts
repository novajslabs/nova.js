import { useSyncExternalStore } from "react";

const langSubscribe = (cb: () => void) => {
  window.addEventListener("languagechange", cb);
  return () => window.removeEventListener("languagechange", cb);
};

const getLang = () => navigator.language;

/**
 * React hook to read the current browser language and stay updated when it changes.
 *
 * @returns {string} The current `navigator.language` value.
 */
export const useLang = (): string => useSyncExternalStore(langSubscribe, getLang);
