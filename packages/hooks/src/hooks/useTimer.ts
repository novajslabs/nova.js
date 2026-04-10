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
