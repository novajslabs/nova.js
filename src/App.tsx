import { useCountdown } from "./hooks/js/useCountdown";

function App() {
  const { current, isPaused, isOver, pause, play, reset, togglePause } =
    useCountdown(0, 10);

  return (
    <div>
      <p>Counter value: {current}</p>
      <p>Is the counter paused? {isPaused ? "Yes" : "No"}</p>
      <p>Has the counter over? {isOver ? "Yes" : "No"}</p>
      <button onClick={pause}>Pause</button>
      <button onClick={play}>Play</button>
      <button onClick={reset}>Reset</button>
      <button onClick={togglePause}>Toggle Pause</button>
    </div>
  );
}

export default App;
