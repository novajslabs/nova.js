import { useState, useEffect } from 'react';

type OrientationType =
  | 'landscape-primary'
  | 'landscape-secondary'
  | 'portrait-primary'
  | 'portrait-secondary';

interface DeviceOrientation {
  angle: number;
  type: OrientationType;
}

export const useDeviceOrientation = (): DeviceOrientation => {
  const [orientation, setOrientation] = useState<DeviceOrientation>({
    angle: 0,
    type: 'landscape-primary'
  });

  useEffect(() => {
    const handleOrientationChange = (): void => {
      const angle = window.screen.orientation.angle;
      const type = window.screen.orientation.type as OrientationType;

      setOrientation({ angle, type });
    };

    // Set initial orientation
    handleOrientationChange();

    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return orientation;
};
