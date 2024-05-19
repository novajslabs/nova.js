import { useState } from 'react';

interface Payload {
  lat: number;
  lng: number;
}

export function useGeolocation(defaultPosition: Payload | null = null) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<Payload | null>(defaultPosition);
  const [error, setError] = useState<string | null>(null);

  function getPosition(): void {
    if (!navigator.geolocation)
      return setError('Your browser does not support geolocation');

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, position, error, getPosition };
}
