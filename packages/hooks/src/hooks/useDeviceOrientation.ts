import { useSyncExternalStore } from "react";

const orientationSubscribe = (cb: () => void) => {
  window.addEventListener("orientationchange", cb);
  return () => window.removeEventListener("orientationchange", cb);
};

const getOrientation = () => window.screen.orientation.type;
const getAngle = () => window.screen.orientation.angle;

const serverSnapshotOrientation = (): OrientationType => "portrait-primary";
const serverSnapshotAngle = () => 0;

/**
 * React hook to read the current screen orientation.
 *
 * @returns {Object} An object with the current orientation data.
 * @returns {OrientationType} returns.type - Current orientation type.
 * @returns {number} returns.angle - Current orientation angle in degrees.
 */
export const useDeviceOrientation = () => ({
  type: useSyncExternalStore(orientationSubscribe, getOrientation, serverSnapshotOrientation),
  angle: useSyncExternalStore(orientationSubscribe, getAngle, serverSnapshotAngle),
});
