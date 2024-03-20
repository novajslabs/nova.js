import { useToggle } from "./hooks/ts/useToggle";

const AppTs = () => {
  const { current, handleToggle } = useToggle(false);

  return (
    <div>
      <p>Current value: {current ? "True" : "False"}</p>
      <button onClick={handleToggle}>Toggle value</button>
    </div>
  );
};

export default AppTs;
