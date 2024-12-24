import { useMousePosition } from '../../hooks/ts/useMousePosition';
import './index.css';

export const CursorPositionRealTime = () => {
  const { x, y } = useMousePosition();

  return (
    <div className="container">
      <div className="cursor-card">
        x: {x}, y: {y}
      </div>
    </div>
  );
};
