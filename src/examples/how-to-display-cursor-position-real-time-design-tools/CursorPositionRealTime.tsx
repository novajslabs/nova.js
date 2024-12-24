import { useMousePosition } from '../../hooks/ts/useMousePosition';
import './styles.css';

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
