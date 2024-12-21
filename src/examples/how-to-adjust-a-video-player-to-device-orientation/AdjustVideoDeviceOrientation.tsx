import { useDeviceOrientation } from '../../hooks/ts/useDeviceOrientation';

export const AdjustVideoDeviceOrientation = () => {
  const orientation = useDeviceOrientation();

  return (
    <video
      src="https://www.w3schools.com/html/mov_bbb.mp4"
      controls
      style={{
        width: '100%',
        maxHeight: orientation.type.includes('landscape') ? '100vh' : 'auto'
      }}
    />
  );
};
