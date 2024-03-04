import { useLang } from "./hooks/ts/user/useLang";

function App() {
  const a = useLang();

  return <>{a}</>;
}

export default App;
