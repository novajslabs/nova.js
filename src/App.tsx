import { useMousePosition } from './hooks/js/useMousePosition';

const App = () => {
  const mousePosition = useMousePosition();
  console.log(mousePosition);
  return (
    <div>
      <p>
        Mouse is at ({mousePosition.x}, {mousePosition.y})
      </p>
    </div>
  );
};

export default App;
