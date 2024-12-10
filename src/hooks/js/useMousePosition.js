import { useSyncExternalStore } from 'react';

let mousePosition = { x: 0, y: 0 };

export const useMousePosition = () => {
  const subscribe = (callback) => {
    const handleMouseMove = (event) => {
      mousePosition = {
        x: event.clientX,
        y: event.clientY
      };
      callback();
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  };

  const getSnapshot = () => mousePosition;

  const getServerSnapshot = () => ({ x: 0, y: 0 });

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
