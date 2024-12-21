import { useState } from 'react';
import { usePrevious } from '../../hooks/ts/usePrevious';

export const TrackTemperatureChanges = () => {
  const [temperature, setTemperature] = useState(20);
  const previousTemperature = usePrevious(temperature);

  const simulateTemperatureChange = () => {
    setInterval(() => {
      const randomChange = Math.floor(Math.random() * 5) - 2;
      setTemperature((prev) => prev + randomChange);
    }, 1500);
  };

  return (
    <>
      <p>Current Temperature: {temperature}°C</p>
      <p>Previous Temperature: {previousTemperature ?? 'N/A'}°C</p>
      {previousTemperature !== undefined && (
        <p>
          {temperature > previousTemperature
            ? 'It’s getting warmer! 🌡️'
            : temperature < previousTemperature
              ? 'It’s getting colder! ❄️'
              : 'No change in temperature. 🤔'}
        </p>
      )}
      <button onClick={simulateTemperatureChange}>
        Simulate temperature change
      </button>
    </>
  );
};
