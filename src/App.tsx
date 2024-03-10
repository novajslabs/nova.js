import { useClipboard } from "./hooks/ts/useClipboard";
import { useRef } from "react";

function App() {
  const { copiedText, copyToClipboard } = useClipboard();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    copyToClipboard(inputRef.current?.value || "")
      .then(() => alert("Copied!"))
      .catch(() => alert("Failed!"));
  };

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>Copy input text</button>
    </div>
  );
}

export default App;
