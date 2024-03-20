import { useToggle } from "./hooks/ts/useToggle";

const AppTs = () => {
  const { current, handleToggle, setToggle } = useToggle(false);

  return (
    <div>
      <p>Current value: {current ? "True" : "False"}</p>
      <button onClick={handleToggle}>Toggle value</button>
      <button onClick={() => setToggle(false)}>Force false</button>
    </div>
  );
};

export default AppTs;
