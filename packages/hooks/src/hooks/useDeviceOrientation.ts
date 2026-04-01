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
 * React hook to provide the current orientation of the screen.
 *
 * @returns {Object} The current screen orientation.
 * @returns {OrientationType} returns.type - The orientation type: `"portrait-primary"`, `"portrait-secondary"`, `"landscape-primary"`, or `"landscape-secondary"`.
 * @returns {number} returns.angle - The orientation angle in degrees (`0`, `90`, `180`, or `270`).
 *
 * @example
 * const { type, angle } = useDeviceOrientation();
 *
 * return (
 *   <p>
 *     {type} — {angle}°
 *   </p>
 * );
 */
export const useDeviceOrientation = (): object => ({
  type: useSyncExternalStore(orientationSubscribe, getOrientation, serverSnapshotOrientation),
  angle: useSyncExternalStore(orientationSubscribe, getAngle, serverSnapshotAngle),
});
