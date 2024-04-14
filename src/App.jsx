import { useRandomColor } from "./hooks/js/useRandomColor";

function AppJs() {
  const { color, generateColor } = useRandomColor();

  return (
    <div>
      <h1 style={{ color: color }}>Color aleatorio</h1>
      <button onClick={generateColor}>Generar nuevo color</button>
    </div>
  );
}

export default AppJs;
