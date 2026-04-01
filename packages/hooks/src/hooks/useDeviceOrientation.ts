import { useSyncExternalStore } from "react";

const orientationSubscribe = (cb: () => void) => {
  window.addEventListener("orientationchange", cb);
  return () => window.removeEventListener("orientationchange", cb);
};

const getOrientation = () => window.screen.orientation.type;
const getAngle = () => window.screen.orientation.angle;

const serverSnapshotOrientation = (): OrientationType => "portrait-primary";
const serverSnapshotAngle = () => 0;

export const useDeviceOrientation = () => ({
  type: useSyncExternalStore(orientationSubscribe, getOrientation, serverSnapshotOrientation),
  angle: useSyncExternalStore(orientationSubscribe, getAngle, serverSnapshotAngle),
});
