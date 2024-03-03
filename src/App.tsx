import { useTitle } from "./hooks/ts/browserTab/useTitle";
import { useEffect } from "react";

function App() {
  const { title, changeTitle } = useTitle();

  useEffect(() => {
    console.log(title);
  }, [title]);

  return (
    <>
      <button onClick={() => changeTitle(Math.random().toString())}>
        Change title
      </button>
    </>
  );
}

export default App;
