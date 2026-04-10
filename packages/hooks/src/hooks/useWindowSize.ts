import { useSyncExternalStore } from "react";

type WindowSize = {
  width: number;
  height: number;
};

const serverWindowSizeSnapshot: WindowSize = {
  width: 0,
  height: 0,
};

let windowSizeSnapshot = serverWindowSizeSnapshot;

const getWindowSizeSnapshot = (): WindowSize => {
  if (typeof window === "undefined") {
    return serverWindowSizeSnapshot;
  }

  const nextWidth = window.innerWidth;
  const nextHeight = window.innerHeight;

  if (windowSizeSnapshot.width !== nextWidth || windowSizeSnapshot.height !== nextHeight) {
    windowSizeSnapshot = {
      width: nextWidth,
      height: nextHeight,
    };
  }

  return windowSizeSnapshot;
};

const subscribeToWindowSize = (onStoreChange: () => void) => {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  window.addEventListener("resize", onStoreChange);

  return () => window.removeEventListener("resize", onStoreChange);
};

/**
 * React hook to track the current browser window size.
 *
 * @returns {WindowSize} Current window dimensions.
 * @returns {number} returns.width - Current window width in pixels.
 * @returns {number} returns.height - Current window height in pixels.
 */
export const useWindowSize = (): WindowSize =>
  useSyncExternalStore(subscribeToWindowSize, getWindowSizeSnapshot, getWindowSizeSnapshot);
