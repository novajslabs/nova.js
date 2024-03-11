import { useStopwatch } from "./hooks/ts/useStopwatch";

function App() {
  const {
    current,
    isPaused,
    isOver,
    currentDays,
    currentHours,
    currentMinutes,
    currentSeconds,
    elapsedSeconds,
    pause,
    play,
    reset,
    togglePause,
  } = useStopwatch();

  return (
    <div>
      <p>Counter value: {current}</p>
      <p>Is the counter paused? {isPaused ? "Yes" : "No"}</p>
      <p>Has the counter over? {isOver ? "Yes" : "No"}</p>
      <p>Current days: {currentDays}</p>
      <p>Current hours: {currentHours}</p>
      <p>Current minutes: {currentMinutes}</p>
      <p>Current seconds: {currentSeconds}</p>
      <p>Elapsed seconds: {elapsedSeconds}</p>
      <button onClick={pause}>Pause</button>
      <button onClick={play}>Play</button>
      <button onClick={reset}>Reset</button>
      <button onClick={togglePause}>Toggle Pause</button>
    </div>
  );
}

export default App;
