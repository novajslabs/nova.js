import { useLocalStorage } from "./hooks/ts/useLocalStorage";

const AppTs = () => {
  const { current, setItemValue, removeItem } = useLocalStorage<number>(
    "number",
    0
  );

  return (
    <div>
      <p>Valor actual: {current}</p>
      <button onClick={() => setItemValue(Math.floor(Math.random() * 11))}>
        Generate new number
      </button>
      <button onClick={removeItem}>Delete "number" item</button>
    </div>
  );
};

export default AppTs;
