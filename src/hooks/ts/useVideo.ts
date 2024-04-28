import { useEffect, useState, RefObject } from "react";

export const useVideo = (ref: RefObject<HTMLVideoElement>) => {
  const [videoState, setVideoState] = useState({
    isPaused: ref.current ? ref.current?.paused : true,
    isMuted: ref.current ? ref.current?.muted : true,
    currentVolumen: ref.current ? ref.current?.volume : 100,
    currentTime: ref.current ? ref.current?.currentTime : 0,
  });

  const play = () => {
    ref.current?.play();
    setVideoState((prev) => {
      return {
        ...prev,
        isPaused: false,
        isMuted: ref.current ? ref.current.muted : prev.isMuted,
      };
    });
  };

  const pause = () => {
    ref.current?.pause();
    setVideoState((prev) => {
      return {
        ...prev,
        isPaused: true,
      };
    });
  };

  const togglePause = () => (ref.current?.paused ? play() : pause());

  const handleVolume = (delta: number) => {
    const deltaDecimal = delta / 100;

    if (ref.current) {
      let newVolume = ref.current?.volume + deltaDecimal;

      if (newVolume >= 1) {
        newVolume = 1;
      } else if (newVolume <= 0) {
        newVolume = 0;
      }

      ref.current.volume = newVolume;
      setVideoState((prev) => {
        return {
          ...prev,
          currentVolumen: newVolume * 100,
        };
      });
    }
  };

  const handleMute = (mute: boolean) => {
    if (ref.current) {
      ref.current.muted = mute;
      setVideoState((prev) => {
        return {
          ...prev,
          isMuted: mute,
        };
      });
    }
  };

  const handleTime = (delta: number = 5) => {
    if (ref.current) {
      let newTime = ref.current.currentTime + delta;

      if (newTime >= ref.current.duration) {
        newTime = ref.current.duration;
      } else if (newTime <= 0) {
        newTime = 0;
      }

      ref.current.currentTime = newTime;
      setVideoState((prev) => {
        return {
          ...prev,
          currentTime: newTime,
        };
      });
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
    ...videoState,
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
