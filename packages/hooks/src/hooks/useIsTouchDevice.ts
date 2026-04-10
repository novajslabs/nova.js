import { useSyncExternalStore } from "react";

const getTouchDeviceSnapshot = () =>
  typeof window !== "undefined" &&
  typeof navigator !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

const subscribeToTouchDevice = (onStoreChange: () => void) => {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  window.addEventListener("resize", onStoreChange);

  return () => {
    window.removeEventListener("resize", onStoreChange);
  };
};

/**
 * React hook to determine whether the current device supports touch input.
 *
 * @returns {boolean} `true` when touch input is available on the current device.
 */
export const useIsTouchDevice = () => {
  return useSyncExternalStore(subscribeToTouchDevice, getTouchDeviceSnapshot, () => false);
};
