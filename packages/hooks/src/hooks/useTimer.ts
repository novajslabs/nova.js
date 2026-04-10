import { useState, useEffect } from "react";

const parseTime = (time: string) => {
  const splitTime = time.split(":");

  const [days, hours, minutes, seconds] = splitTime.map((value) => Number(value));

  return { days, hours, minutes, seconds };
};

const addLeadingZero = (digit: number): string => {
  return digit % 10 === digit ? `0${digit}` : `${digit}`;
};

interface Timer {
  current: string;
  isPaused: boolean;
  isOver: boolean;
  currentDays: number;
  currentHours: number;
  currentMinutes: number;
  currentSeconds: number;
  elapsedSeconds: number;
  remainingSeconds: number;
  pause: () => void;
  play: () => void;
  reset: () => void;
  togglePause: () => void;
}

/**
 * React hook to run a countdown timer from a `dd:hh:mm:ss` starting value.
 *
 * @param {string} startTime - Initial timer value in `dd:hh:mm:ss` format.
 * @returns {Timer} An object with timer state and control methods.
 * @returns {string} returns.current - Formatted remaining time as `dd:hh:mm:ss`.
 * @returns {boolean} returns.isPaused - `true` when the timer is paused.
 * @returns {boolean} returns.isOver - `true` when the timer reaches zero.
 * @returns {number} returns.currentDays - Current remaining day count.
 * @returns {number} returns.currentHours - Current remaining hour count.
 * @returns {number} returns.currentMinutes - Current remaining minute count.
 * @returns {number} returns.currentSeconds - Current remaining second count.
 * @returns {number} returns.elapsedSeconds - Seconds elapsed since the timer started.
 * @returns {number} returns.remainingSeconds - Seconds remaining until the timer reaches zero.
 * @returns {() => void} returns.pause - Pauses the timer.
 * @returns {() => void} returns.play - Resumes the timer.
 * @returns {() => void} returns.reset - Resets the timer back to the original `startTime`.
 * @returns {() => void} returns.togglePause - Toggles between paused and running states.
 */
export const useTimer = (startTime: string): Timer => {
  const { days, hours, minutes, seconds } = parseTime(startTime);
  const [time, setTime] = useState({ days, hours, minutes, seconds });
  const [paused, setPaused] = useState(false);
  const divider = ":";
  const initialIsOver = days === 0 && hours === 0 && minutes === 0 && seconds === 0;
  const [isOver, setIsOver] = useState(initialIsOver);

  useEffect(
    function syncTimer() {
      if (paused || isOver) {
        return;
      }

      const interval = setInterval(() => {
        setTime((prev) => {
          if (prev.days === 0 && prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
            setIsOver(true);
            clearInterval(interval);
            return prev;
          }

          let d = prev.days;
          let h = prev.hours;
          let m = prev.minutes;
          let s = prev.seconds;

          if (s - 1 < 0) {
            s = 59;
            if (m - 1 < 0) {
              m = 59;
              if (h - 1 < 0) {
                h = 23;
                if (d - 1 >= 0) {
                  d--;
                }
              } else {
                h--;
              }
            } else {
              m--;
            }
          } else {
            s--;
          }

          if (d === 0 && h === 0 && m === 0 && s === 0) {
            setIsOver(true);
            clearInterval(interval);
          }

          return { days: d, hours: h, minutes: m, seconds: s };
        });
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    },
    [isOver, paused],
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
    elapsedSeconds:
      days * 86400 +
      hours * 3600 +
      minutes * 60 +
      seconds -
      (time.days * 86400 + time.hours * 3600 + time.minutes * 60 + time.seconds),
    remainingSeconds: time.days * 86400 + time.hours * 3600 + time.minutes * 60 + time.seconds,
    pause: () => setPaused(true),
    play: () => setPaused(false),
    reset: () => {
      setIsOver(initialIsOver);
      setTime({ days, hours, minutes, seconds });
    },
    togglePause: () => {
      setPaused(!paused);
    },
  };
};
