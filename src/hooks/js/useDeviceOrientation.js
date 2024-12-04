import { useSyncExternalStore } from 'react';

const orientationSubscribe = (cb) => {
  window.addEventListener('orientationchange', cb);
  return () => window.removeEventListener('orientationchange', cb);
};

const getOrientation = () => window.screen.orientation;

export const useDeviceOrientation = () =>
  useSyncExternalStore(orientationSubscribe, getOrientation);
