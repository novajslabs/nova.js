import { useSyncExternalStore } from 'react';

const orientationSubscribe = (cb) => {
  window.addEventListener('orientationchange', cb);
  return () => window.removeEventListener('orientationchange', cb);
};

const getOrientation = () => {
  return {
    type: window.screen.orientation.type,
    angle: window.screen.orientation.angle
  };
};

export const useDeviceOrientation = () =>
  useSyncExternalStore(orientationSubscribe, getOrientation);
