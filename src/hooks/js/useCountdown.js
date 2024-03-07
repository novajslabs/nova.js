import { useState, useEffect } from "react";

export const useCountdown = (min, max, options) => {
  const startPaused = options.startPaused;
  const onFinish = options.onFinish;
  const [count, setCount] = useState(max);
  const [paused, setPaused] = useState(startPaused ?? false);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    if (paused) {
      return;
    }

    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    if (count <= min) {
      setIsOver(true);
      clearInterval(interval);
      return;
    }

    return () => clearInterval(interval);
  }, [count, min, max, paused]);

  useEffect(() => {
    isOver && onFinish && onFinish();
  }, [isOver]);

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
