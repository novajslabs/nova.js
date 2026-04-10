import { useState, useEffect } from "react";

const addLeadingZero = (digit: number): string => {
  return digit % 10 === digit ? `0${digit}` : `${digit}`;
};

interface Stopwatch {
  current: string;
  isPaused: boolean;
  isOver: boolean;
  currentDays: number;
  currentHours: number;
  currentMinutes: number;
  currentSeconds: number;
  elapsedSeconds: number;
  pause: () => void;
  play: () => void;
  reset: () => void;
  togglePause: () => void;
}

/**
 * React hook to run a stopwatch that counts up in days, hours, minutes, and seconds.
 *
 * @returns {Stopwatch} An object with stopwatch state and control methods.
 * @returns {string} returns.current - Formatted stopwatch value as `dd:hh:mm:ss`.
 * @returns {boolean} returns.isPaused - `true` when the stopwatch is paused.
 * @returns {boolean} returns.isOver - Completion flag exposed by the hook state.
 * @returns {number} returns.currentDays - Current day counter.
 * @returns {number} returns.currentHours - Current hour counter.
 * @returns {number} returns.currentMinutes - Current minute counter.
 * @returns {number} returns.currentSeconds - Current second counter.
 * @returns {number} returns.elapsedSeconds - Total elapsed time in seconds.
 * @returns {() => void} returns.pause - Pauses the stopwatch.
 * @returns {() => void} returns.play - Resumes the stopwatch.
 * @returns {() => void} returns.reset - Resets the stopwatch back to zero.
 * @returns {() => void} returns.togglePause - Toggles between paused and running states.
 */
export const useStopwatch = (): Stopwatch => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [paused, setPaused] = useState(false);
  const divider = ":";
  const [isOver, setIsOver] = useState(false);

  useEffect(
    function syncStopwatch() {
      if (paused) {
        return;
      }

      const interval = setInterval(() => {
        setTime((prev) => {
          let d = prev.days;
          let h = prev.hours;
          let m = prev.minutes;
          let s = prev.seconds;

          if (s + 1 >= 60) {
            s = 0;
            if (m + 1 >= 60) {
              m = 0;
              if (h + 1 >= 24) {
                h = 0;
                d++;
              } else {
                h++;
              }
            } else {
              m++;
            }
          } else {
            s++;
          }

          return { days: d, hours: h, minutes: m, seconds: s };
        });
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    },
    [paused],
  );

  return {
    current: `${addLeadingZero(time.days)}${divider}${addLeadingZero(
      time.hours,
    )}${divider}${addLeadingZero(time.minutes)}${divider}${addLeadingZero(time.seconds)}`,
    isPaused: paused,
    isOver,
    currentDays: time.days,
    currentHours: time.hours,
    currentMinutes: time.minutes,
    currentSeconds: time.seconds,
    elapsedSeconds: time.days * 86400 + time.hours * 3600 + time.minutes * 60 + time.seconds,
    pause: () => setPaused(true),
    play: () => setPaused(false),
    reset: () => {
      setIsOver(false);
      setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    },
    togglePause: () => {
      setPaused(!paused);
    },
  };
};
