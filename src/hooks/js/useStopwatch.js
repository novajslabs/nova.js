import { useState, useEffect } from 'react';

const addLeadingZero = (digit) => {
  let timeStr = '';

  digit % 10 === digit ? (timeStr += `0${digit}`) : (timeStr += `${digit}`);

  return timeStr;
};

export const useStopwatch = () => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [paused, setPaused] = useState(false);
  const divider = ':';
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
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

    return () => clearInterval(interval);
  }, [time, paused]);

  return {
    current: `${addLeadingZero(time.days)}${divider}${addLeadingZero(
      time.hours
    )}${divider}${addLeadingZero(time.minutes)}${divider}${addLeadingZero(
      time.seconds
    )}`,
    isPaused: paused,
    isOver,
    currentDays: time.days,
    currentHours: time.hours,
    currentMinutes: time.minutes,
    currentSeconds: time.seconds,
    elapsedSeconds:
      time.days * 86400 + time.hours * 3600 + time.minutes * 60 + time.seconds,
    pause: () => setPaused(true),
    play: () => setPaused(false),
    reset: () => {
      setIsOver(false);
      setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    },
    togglePause: () => {
      setPaused(!paused);
    }
  };
};
