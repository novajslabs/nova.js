import { useSyncExternalStore } from "react";

/**
 * React hook to track whether the browser is currently offline.
 *
 * @returns {boolean} `true` when `navigator.onLine` reports that the browser is offline.
 */
export const useOffline = () => {
  const getSnapshot = () => !navigator.onLine;

  const subscribe = (callback: () => void) => {
    const handleNetworkChange = () => callback();

    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange);

    return () => {
      window.removeEventListener("online", handleNetworkChange);
      window.removeEventListener("offline", handleNetworkChange);
    };
  };

  return useSyncExternalStore(subscribe, getSnapshot);
};
