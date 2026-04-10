import { useEffect, useState, type RefObject } from "react";

/**
 * React hook to control a `<video>` element and keep playback state in sync.
 *
 * @param {RefObject<HTMLVideoElement>} ref - Ref attached to the target `<video>` element.
 * @returns {Object} An object with video state and playback controls.
 * @returns {boolean} returns.isPaused - `true` when the video is paused.
 * @returns {boolean} returns.isMuted - `true` when the video is muted.
 * @returns {number} returns.currentVolume - Current volume from `0` to `100`.
 * @returns {number} returns.currentTime - Current playback position in seconds.
 * @returns {() => void} returns.play - Starts playback.
 * @returns {() => void} returns.pause - Pauses playback.
 * @returns {() => void} returns.togglePause - Toggles between play and pause.
 * @returns {(increase?: number) => void} returns.increaseVolume - Increases the volume by the provided percentage points. Defaults to `5`.
 * @returns {(decrease?: number) => void} returns.decreaseVolume - Decreases the volume by the provided percentage points. Defaults to `5`.
 * @returns {() => void} returns.mute - Mutes the video.
 * @returns {() => void} returns.unmute - Unmutes the video.
 * @returns {() => void} returns.toggleMute - Toggles the muted state.
 * @returns {(seconds?: number) => void} returns.forward - Moves playback forward by the provided number of seconds. Defaults to `5`.
 * @returns {(seconds?: number) => void} returns.back - Moves playback backward by the provided number of seconds. Defaults to `5`.
 * @returns {() => void} returns.toggleFullscreen - Toggles fullscreen mode for the referenced video element.
 */
export const useVideo = (ref: RefObject<HTMLVideoElement>) => {
  const [videoState, setVideoState] = useState(() => {
    const video = ref.current;

    return {
      isPaused: video ? video.paused : true,
      isMuted: video ? video.muted : false,
      currentVolume: video ? video.volume * 100 : 100,
      currentTime: video ? video.currentTime : 0,
    };
  });

  const play = () => {
    const video = ref.current;

    video?.play();
    setVideoState((prev) => {
      return {
        ...prev,
        isPaused: false,
        isMuted: video ? video.muted : prev.isMuted,
      };
    });
  };

  const pause = () => {
    const video = ref.current;

    video?.pause();
    setVideoState((prev) => {
      return {
        ...prev,
        isPaused: true,
      };
    });
  };

  const togglePause = () => (ref.current?.paused ? play() : pause());

  const handleVolume = (delta: number) => {
    const video = ref.current;
    const deltaDecimal = delta / 100;

    if (video) {
      let newVolume = video?.volume + deltaDecimal;

      if (newVolume >= 1) {
        newVolume = 1;
      } else if (newVolume <= 0) {
        newVolume = 0;
      }

      video.volume = newVolume;
      setVideoState((prev) => {
        return {
          ...prev,
          currentVolume: newVolume * 100,
        };
      });
    }
  };

  const handleMute = (mute: boolean) => {
    const video = ref.current;

    if (video) {
      video.muted = mute;
      setVideoState((prev) => {
        return {
          ...prev,
          isMuted: mute,
        };
      });
    }
  };

  const handleTime = (delta: number = 5) => {
    const video = ref.current;

    if (video) {
      let newTime = video.currentTime + delta;

      if (newTime >= video.duration) {
        newTime = video.duration;
      } else if (newTime <= 0) {
        newTime = 0;
      }

      video.currentTime = newTime;
      setVideoState((prev) => {
        return {
          ...prev,
          currentTime: newTime,
        };
      });
    }
  };

  const toggleFullscreen = () => {
    const video = ref.current;

    if (!document.fullscreenElement) {
      video?.requestFullscreen().catch((err) => {
        console.log(err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(
    function syncVideoElement() {
      const video = ref.current;

      if (!video) {
        return;
      }

      const handleVideoVolumeControl = (e: Event) => {
        const target = e.target;

        if (!(target instanceof HTMLVideoElement)) {
          return;
        }

        setVideoState((prev) => ({
          ...prev,
          isMuted: target.muted,
          currentVolume: target.volume * 100,
        }));
      };

      const handleVideoPlayPauseControl = (e: Event) => {
        const target = e.target;

        if (!(target instanceof HTMLVideoElement)) {
          return;
        }

        setVideoState((prev) => ({
          ...prev,
          isPaused: target.paused,
        }));
      };

      const handleVideoTimeControl = (e: Event) => {
        const target = e.target;

        if (!(target instanceof HTMLVideoElement)) {
          return;
        }

        setVideoState((prev) => ({
          ...prev,
          currentTime: target.currentTime,
        }));
      };

      video.addEventListener("volumechange", handleVideoVolumeControl);
      video.addEventListener("play", handleVideoPlayPauseControl);
      video.addEventListener("pause", handleVideoPlayPauseControl);
      video.addEventListener("timeupdate", handleVideoTimeControl);

      return () => {
        video.removeEventListener("volumechange", handleVideoVolumeControl);
        video.removeEventListener("play", handleVideoPlayPauseControl);
        video.removeEventListener("pause", handleVideoPlayPauseControl);
        video.removeEventListener("timeupdate", handleVideoTimeControl);
        video.pause();
      };
    },
    [ref],
  );

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
