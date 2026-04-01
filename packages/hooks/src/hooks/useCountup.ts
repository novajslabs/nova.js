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
 * React hook to create a countup functionality.
 *
 * @param {number} min - The starting value of the countup.
 * @param {number} max - The upper boundary at which the countup stops.
 *
 * @returns {Counter} An object with the current countup state and control methods.
 * @returns {string} returns.current - The current count as a string.
 * @returns {boolean} returns.isPaused - `true` if the countup is paused.
 * @returns {boolean} returns.isOver - `true` if the countup has reached `max`.
 * @returns {() => void} returns.pause - Pauses the countup.
 * @returns {() => void} returns.play - Resumes the countup.
 * @returns {() => void} returns.reset - Resets the count back to `min` and clears the `isOver` flag.
 * @returns {() => void} returns.togglePause - Pauses if running, resumes if paused.
 *
 * @example
 * const { current, isPaused, isOver, pause, play, reset } = useCountup(0, 60);
 *
 * if (isOver) return <p>Time's up!</p>;
 *
 * return (
 *   <div>
 *     <p>{current}s elapsed</p>
 *     <button onClick={isPaused ? play : pause}>
 *       {isPaused ? "Resume" : "Pause"}
 *     </button>
 *     <button onClick={reset}>Restart</button>
 *   </div>
 * );
 */
export const useCountup = (min: number, max: number): Counter => {
  const [count, setCount] = useState(min);
  const [paused, setPaused] = useState(false);
  const [isOver, setIsOver] = useState(false);

  useEffect(
    function syncCountup() {
      if (paused || isOver) return;

      const interval = setInterval(() => {
        setCount((prev) => {
          if (prev + 1 >= max) {
            setIsOver(true);
            clearInterval(interval);
            return max;
          }
          return prev + 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    },
    [paused, isOver, max],
  );

  return {
    current: count.toString(),
    isPaused: paused,
    isOver,
    pause: () => setPaused(true),
    play: () => setPaused(false),
    reset: () => {
      setIsOver(false);
      setCount(min);
    },
    togglePause: () => {
      setPaused(!paused);
    },
  };
};
