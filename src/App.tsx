import { useLocalStorage } from "./hooks/ts/useLocalStorage";

const AppTs = () => {
  const { current, setValue, removeValue } = useLocalStorage(
    "firstVisit",
    true
  );

  return (
    <div>
      <p>Valor actual: {current}</p>
      <button onClick={() => setValue(true)}>Nuevo valor</button>
      <button onClick={removeValue}>Eliminar valor</button>
    </div>
  );
};

export default AppTs;
