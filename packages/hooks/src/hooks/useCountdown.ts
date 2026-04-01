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
 * React hook to create a countdown functionality.
 *
 * @param {number} min - The lower boundary at which the countdown stops.
 * @param {number} max - The starting value of the countdown.
 *
 * @returns {Counter} An object with the current countdown state and control methods.
 * @returns {string} returns.current - The current count as a string.
 * @returns {boolean} returns.isPaused - `true` if the countdown is paused.
 * @returns {boolean} returns.isOver - `true` if the countdown has reached `min`.
 * @returns {() => void} returns.pause - Pauses the countdown.
 * @returns {() => void} returns.play - Resumes the countdown.
 * @returns {() => void} returns.reset - Resets the count back to `max` and clears the `isOver` flag.
 * @returns {() => void} returns.togglePause - Pauses if running, resumes if paused.
 *
 * @example
 * const { current, isPaused, isOver, pause, play, reset } = useCountdown(0, 60);
 *
 * if (isOver) return <p>Time's up!</p>;
 *
 * return (
 *   <div>
 *     <p>{current}s remaining</p>
 *     <button onClick={isPaused ? play : pause}>
 *       {isPaused ? "Resume" : "Pause"}
 *     </button>
 *     <button onClick={reset}>Restart</button>
 *   </div>
 * );
 */
export const useCountdown = (min: number, max: number): Counter => {
  const [count, setCount] = useState(max);
  const [paused, setPaused] = useState(false);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
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
  }, [paused, isOver, min]);

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
