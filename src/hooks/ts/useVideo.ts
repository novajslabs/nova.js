import { useEffect, RefObject } from "react";

export const useVideo = (ref: RefObject<HTMLVideoElement>) => {
  const play = () => ref.current?.play();

  const pause = () => ref.current?.pause();

  const togglePause = () => (ref.current?.paused ? play() : pause());

  const setVolume = (volume: number) => {
    if (ref.current) ref.current.volume = ref.current.volume + volume;
  };

  const increaseVolume = () => setVolume(0.05);

  const decreaseVolume = () => setVolume(-0.05);

  const mute = () => {
    if (ref.current) ref.current.muted = true;
  };

  const unmute = () => {
    if (ref.current) ref.current.muted = false;
  };

  const setCurrentTime = (time: number) => {
    if (ref.current) {
      ref.current.currentTime = time;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      ref.current?.requestFullscreen().catch((err) => {
        alert(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    return () => {
      pause();
    };
  }, []);

  return {
    play,
    pause,
    togglePause,
    increaseVolume,
    decreaseVolume,
    mute,
    setCurrentTime,
    toggleFullscreen,
  };
};
