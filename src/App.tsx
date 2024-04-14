import { useRandomColor } from "./hooks/ts/useRandomColor";

function AppTs() {
  const { color, generateColor } = useRandomColor();

  return (
    <div>
      <h1 style={{ color: color }}>Color aleatorio</h1>
      <button onClick={generateColor}>Generar nuevo color</button>
    </div>
  );
}

export default AppTs;
