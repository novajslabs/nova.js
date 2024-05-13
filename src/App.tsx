import { useKeyPress } from "./hooks/ts/useKeyPress";

const AppTs = () => {
  const isBPressed = useKeyPress({ key: "b" });

  return <div>{isBPressed ? "b is pressed" : "b is not pressed"}</div>;
};

export default AppTs;
