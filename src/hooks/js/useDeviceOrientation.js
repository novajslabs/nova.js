import { useSyncExternalStore } from 'react';

const orientationSubscribe = (cb) => {
  window.addEventListener('orientationchange', cb);
  return () => window.removeEventListener('orientationchange', cb);
};

const getOrientation = () => {
  const { type, angle } = window.screen.orientation;
  return JSON.stringify({ type, angle });
};

export const useDeviceOrientation = () =>
  JSON.parse(useSyncExternalStore(orientationSubscribe, getOrientation));
