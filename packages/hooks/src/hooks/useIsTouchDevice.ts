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

export function useIsTouchDevice() {
  return useSyncExternalStore(subscribeToTouchDevice, getTouchDeviceSnapshot, () => false);
}
