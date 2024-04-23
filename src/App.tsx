import { useVideo } from "./hooks/ts/useVideo";
import { useRef } from "react";
import video from "./a.mp4";

function AppTs() {
  const a = useRef<HTMLVideoElement>(null);
  const {
    play,
    pause,
    togglePause,
    increaseVolume,
    decreaseVolume,
    setCurrentTime,
    toggleFullscreen,
  } = useVideo(a);

  return (
    <div>
      <video ref={a} src={video} />
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
      <button onClick={togglePause}>Toggle pause</button>
      <button onClick={increaseVolume}>Volume +</button>
      <button onClick={decreaseVolume}>Volume -</button>
      <button onClick={() => setCurrentTime(10)}>Seek to 10 seconds</button>
      <button onClick={toggleFullscreen}>Toggle Fullscreen</button>
    </div>
  );
}

export default AppTs;
