import { useVideo } from "./hooks/ts/useVideo";
import { useRef } from "react";
import videoFile from "./a.mp4";

function AppTs() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const {
    isPaused,
    isMuted,
    currentVolume,
    currentTime,
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
      <video ref={videoRef} src={videoFile} width={500} height={500} controls />
      <p>The video is {isPaused ? "paused" : "playing"}</p>
      <p>The video is {isMuted ? "muted" : "unmuted"}</p>
      <p>The video volume is {currentVolume}</p>
      <p>The video current time is {currentTime} seconds</p>
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
      <button onClick={togglePause}>Toggle pause</button>
      <button onClick={mute}>Mute</button>
      <button onClick={unmute}>Unmute</button>
      <button onClick={toggleMute}>Toggle mute</button>
      <button onClick={() => increaseVolume(25)}>Volume +</button>
      <button onClick={() => decreaseVolume(25)}>Volume -</button>
      <button onClick={() => back()}>Back</button>
      <button onClick={() => forward()}>Forward</button>
      <button onClick={toggleFullscreen}>Toggle Fullscreen</button>
    </div>
  );
}

export default AppTs;
