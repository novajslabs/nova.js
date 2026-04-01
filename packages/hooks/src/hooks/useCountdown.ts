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
