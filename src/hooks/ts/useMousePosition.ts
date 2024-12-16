import { useSyncExternalStore } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

let mousePosition: MousePosition = { x: 0, y: 0 };

export const useMousePosition = (): MousePosition => {
  const subscribe = (callback: () => void) => {
    const handleMouseMove = (event: MouseEvent) => {
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

  const getSnapshot = (): MousePosition => mousePosition;

  const getServerSnapshot = (): MousePosition => ({ x: 0, y: 0 });

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
