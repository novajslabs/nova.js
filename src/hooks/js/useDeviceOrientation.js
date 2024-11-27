import { useState, useEffect } from 'react';

function useDeviceOrientation() {
  const [orientation, setOrientation] = useState({
    angle: 0,
    type: 'landscape-primary'
  });

  useEffect(() => {
    const handleOrientationChange = () => {
      const angle = window.screen.orientation.angle;
      const type = window.screen.orientation.type;

      setOrientation({ angle, type });
    };

    handleOrientationChange();

    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return orientation;
}

export default useDeviceOrientation;
