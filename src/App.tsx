import { useFavicon } from "./hooks/ts/browserTab/useFavicon";
import fav1 from "./favicon1.ico";
import fav2 from "./favicon2.ico";

function App() {
  const changeFavicon = useFavicon();

  return (
    <>
      <button onClick={() => changeFavicon(fav1)}>Change 1</button>
      <button onClick={() => changeFavicon(fav2)}>Change 2</button>
    </>
  );
}

export default App;
