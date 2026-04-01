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
