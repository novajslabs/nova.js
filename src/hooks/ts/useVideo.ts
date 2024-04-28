import { useEffect, RefObject } from "react";

export const useVideo = (ref: RefObject<HTMLVideoElement>) => {
  const play = () => ref.current?.play();

  const pause = () => ref.current?.pause();

  const togglePause = () => (ref.current?.paused ? play() : pause());

  const handleVolume = (delta: number) => {
    const deltaDecimal = delta / 100;

    if (ref.current) {
      const newVolumen = ref.current?.volume + deltaDecimal;

      if (newVolumen < 1 && newVolumen > 0) {
        ref.current.volume = ref.current?.volume + deltaDecimal;
      } else if (newVolumen > 1) {
        ref.current.volume = 1;
      } else {
        ref.current.volume = 0;
      }
    }
  };
  const handleMute = (mute: boolean) => {
    if (ref.current) ref.current.muted = mute;
  };

  const handleTime = (delta: number = 5) => {
    if (ref.current) {
      ref.current.currentTime = ref.current.currentTime + delta;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      ref.current?.requestFullscreen().catch((err) => {
        console.log(err);
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
    increaseVolume: (increase: number = 5) => handleVolume(increase),
    decreaseVolume: (decrease: number = 5) => handleVolume(decrease * -1),
    mute: () => handleMute(true),
    unmute: () => handleMute(false),
    toggleMute: () => handleMute(!ref.current?.muted),
    forward: (increase: number = 5) => handleTime(increase),
    back: (decrease: number = 5) => handleTime(decrease * -1),
    toggleFullscreen,
  };
};
