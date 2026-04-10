import { useState, useEffect } from "react";

interface Counter {
  current: string;
  isPaused: boolean;
  isOver: boolean;
  pause: () => void;
  play: () => void;
  reset: () => void;
  togglePause: () => void;
}

/**
 * React hook to count down from a maximum value to a minimum value at one-second intervals.
 *
 * @param {number} min - Lower bound where the countdown stops.
 * @param {number} max - Initial countdown value.
 * @returns {Counter} An object with countdown state and control methods.
 * @returns {string} returns.current - Current countdown value as a string.
 * @returns {boolean} returns.isPaused - `true` when the countdown is paused.
 * @returns {boolean} returns.isOver - `true` when the countdown reaches `min`.
 * @returns {() => void} returns.pause - Pauses the countdown.
 * @returns {() => void} returns.play - Resumes the countdown.
 * @returns {() => void} returns.reset - Resets the countdown back to `max`.
 * @returns {() => void} returns.togglePause - Toggles between paused and running states.
 */
export const useCountdown = (min: number, max: number): Counter => {
  const [count, setCount] = useState(max);
  const [paused, setPaused] = useState(false);
  const [isOver, setIsOver] = useState(false);

  useEffect(
    function syncCountdown() {
      if (paused || isOver) return;

      const interval = setInterval(() => {
        setCount((prev) => {
          if (prev - 1 <= min) {
            setIsOver(true);
            clearInterval(interval);
            return min;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    },
    [paused, isOver, min],
  );

  return {
    current: count.toString(),
    isPaused: paused,
    isOver,
    pause: () => setPaused(true),
    play: () => setPaused(false),
    reset: () => {
      setIsOver(false);
      setCount(max);
    },
    togglePause: () => {
      setPaused(!paused);
    },
  };
};
