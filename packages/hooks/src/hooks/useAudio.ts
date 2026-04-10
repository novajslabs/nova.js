import { useEffect, useState, type RefObject } from "react";

/**
 * React hook to manage an audio.
 *
 * @param {RefObject<HTMLAudioElement>} ref - A ref attached to the target `<audio>` element.
 *
 * @returns {Object} An object with the current audio state and control methods.
 * @returns {boolean} returns.isPaused - `true` if the audio is currently paused.
 * @returns {boolean} returns.isMuted - `true` if the audio is currently muted.
 * @returns {number} returns.currentVolume - Current volume level from `0` to `100`.
 * @returns {number} returns.currentTime - Current playback position in seconds.
 * @returns {() => void} returns.play - Starts playback.
 * @returns {() => void} returns.pause - Pauses playback.
 * @returns {() => void} returns.togglePause - Plays if paused, pauses if playing.
 * @returns {(increase?: number) => void} returns.increaseVolume - Increases volume by the given percentage points (default: `5`). Clamped to `100`.
 * @returns {(decrease?: number) => void} returns.decreaseVolume - Decreases volume by the given percentage points (default: `5`). Clamped to `0`.
 * @returns {() => void} returns.mute - Mutes the audio.
 * @returns {() => void} returns.unmute - Unmutes the audio.
 * @returns {() => void} returns.toggleMute - Mutes if unmuted, unmutes if muted.
 * @returns {(seconds?: number) => void} returns.forward - Seeks forward by the given number of seconds (default: `5`). Clamped to the track duration.
 * @returns {(seconds?: number) => void} returns.back - Seeks backward by the given number of seconds (default: `5`). Clamped to `0`.
 *
 * @example
 * const audioRef = useRef<HTMLAudioElement>(null);
 *
 * const {
 *   isPaused, isMuted, currentVolume, currentTime,
 *   togglePause, toggleMute, forward, back,
 *   increaseVolume, decreaseVolume,
 * } = useAudio(audioRef);
 *
 * return (
 *   <>
 *     <audio ref={audioRef} src="/track.mp3" />
 *     <button onClick={togglePause}>{isPaused ? "Play" : "Pause"}</button>
 *     <button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button>
 *     <button onClick={() => back()}>-5s</button>
 *     <button onClick={() => forward()}>+5s</button>
 *     <p>Volume: {currentVolume}% — Time: {currentTime}s</p>
 *   </>
 * );
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
