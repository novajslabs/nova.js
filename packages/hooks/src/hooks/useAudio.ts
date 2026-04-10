import { useEffect, useState, type RefObject } from "react";

/**
 * React hook to control an `<audio>` element and keep playback state in sync.
 *
 * @param {RefObject<HTMLAudioElement>} ref - Ref attached to the target `<audio>` element.
 * @returns {Object} An object with audio state and playback controls.
 * @returns {boolean} returns.isPaused - `true` when the audio is paused.
 * @returns {boolean} returns.isMuted - `true` when the audio is muted.
 * @returns {number} returns.currentVolume - Current volume from `0` to `100`.
 * @returns {number} returns.currentTime - Current playback position in seconds.
 * @returns {() => void} returns.play - Starts playback.
 * @returns {() => void} returns.pause - Pauses playback.
 * @returns {() => void} returns.togglePause - Toggles between play and pause.
 * @returns {(increase?: number) => void} returns.increaseVolume - Increases the volume by the provided percentage points. Defaults to `5`.
 * @returns {(decrease?: number) => void} returns.decreaseVolume - Decreases the volume by the provided percentage points. Defaults to `5`.
 * @returns {() => void} returns.mute - Mutes the audio.
 * @returns {() => void} returns.unmute - Unmutes the audio.
 * @returns {() => void} returns.toggleMute - Toggles the muted state.
 * @returns {(seconds?: number) => void} returns.forward - Moves playback forward by the provided number of seconds. Defaults to `5`.
 * @returns {(seconds?: number) => void} returns.back - Moves playback backward by the provided number of seconds. Defaults to `5`.
 */
export const useAudio = (ref: RefObject<HTMLAudioElement>) => {
  const [audioState, setAudioState] = useState(() => {
    const audio = ref.current;

    return {
      isPaused: audio ? audio.paused : true,
      isMuted: audio ? audio.muted : false,
      currentVolume: audio ? audio.volume * 100 : 100,
      currentTime: audio ? audio.currentTime : 0,
    };
  });

  const play = () => {
    const audio = ref.current;

    audio?.play();
    setAudioState((prev) => {
      return {
        ...prev,
        isPaused: false,
        isMuted: audio ? audio.muted : prev.isMuted,
      };
    });
  };

  const pause = () => {
    const audio = ref.current;

    audio?.pause();
    setAudioState((prev) => {
      return {
        ...prev,
        isPaused: true,
      };
    });
  };

  const togglePause = () => (ref.current?.paused ? play() : pause());

  const handleVolume = (delta: number) => {
    const audio = ref.current;
    const deltaDecimal = delta / 100;

    if (audio) {
      let newVolume = audio?.volume + deltaDecimal;

      if (newVolume >= 1) {
        newVolume = 1;
      } else if (newVolume <= 0) {
        newVolume = 0;
      }

      audio.volume = newVolume;
      setAudioState((prev) => {
        return {
          ...prev,
          currentVolume: newVolume * 100,
        };
      });
    }
  };

  const handleMute = (mute: boolean) => {
    const audio = ref.current;

    if (audio) {
      audio.muted = mute;
      setAudioState((prev) => {
        return {
          ...prev,
          isMuted: mute,
        };
      });
    }
  };

  const handleTime = (delta: number = 5) => {
    const audio = ref.current;

    if (audio) {
      let newTime = audio.currentTime + delta;

      if (newTime >= audio.duration) {
        newTime = audio.duration;
      } else if (newTime <= 0) {
        newTime = 0;
      }

      audio.currentTime = newTime;
      setAudioState((prev) => {
        return {
          ...prev,
          currentTime: newTime,
        };
      });
    }
  };

  useEffect(
    function syncAudioElement() {
      const audio = ref.current;

      if (!audio) return;

      const handleAudioVolumeControl = (e: Event) => {
        const target = e.target;

        if (!(target instanceof HTMLAudioElement)) {
          return;
        }

        setAudioState((prev) => ({
          ...prev,
          isMuted: target.muted,
          currentVolume: target.volume * 100,
        }));
      };

      const handleAudioPlayPauseControl = (e: Event) => {
        const target = e.target;

        if (!(target instanceof HTMLAudioElement)) {
          return;
        }

        setAudioState((prev) => ({
          ...prev,
          isPaused: target.paused,
        }));
      };

      const handleAudioTimeControl = (e: Event) => {
        const target = e.target;

        if (!(target instanceof HTMLAudioElement)) {
          return;
        }

        setAudioState((prev) => ({
          ...prev,
          currentTime: target.currentTime,
        }));
      };

      audio.addEventListener("volumechange", handleAudioVolumeControl);
      audio.addEventListener("play", handleAudioPlayPauseControl);
      audio.addEventListener("pause", handleAudioPlayPauseControl);
      audio.addEventListener("timeupdate", handleAudioTimeControl);

      return () => {
        audio.removeEventListener("volumechange", handleAudioVolumeControl);
        audio.removeEventListener("play", handleAudioPlayPauseControl);
        audio.removeEventListener("pause", handleAudioPlayPauseControl);
        audio.removeEventListener("timeupdate", handleAudioTimeControl);
        audio.pause();
      };
    },
    [ref],
  );

  return {
    ...audioState,
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
  };
};
