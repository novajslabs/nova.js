import { useVideo } from "./hooks/ts/useVideo";
import { useRef } from "react";
import videoFile from "./a.mp4";

function AppTs() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const {
    play,
    pause,
    togglePause,
    increaseVolume,
    decreaseVolume,
    mute,
    unmute,
    toggleMute,
    forward,
    back,
    toggleFullscreen,
  } = useVideo(videoRef);

  return (
    <div>
      <video ref={videoRef} src={videoFile} width={500} height={500} />
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
      <button onClick={togglePause}>Toggle pause</button>
      <button onClick={mute}>Mute</button>
      <button onClick={unmute}>Unmute</button>
      <button onClick={toggleMute}>Toggle mute</button>
      <button onClick={() => increaseVolume(25)}>Volume +</button>
      <button onClick={() => decreaseVolume(25)}>Volume -</button>
      <button onClick={() => back(100)}>Back</button>
      <button onClick={() => forward(100)}>Forward</button>
      <button onClick={toggleFullscreen}>Toggle Fullscreen</button>
    </div>
  );
}

export default AppTs;
