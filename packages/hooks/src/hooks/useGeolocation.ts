import { useState } from "react";

interface Payload {
  lat: number;
  lng: number;
}

/**
 * React hook to request the user's current geolocation on demand.
 *
 * @param {Payload | null} [defaultPosition=null] - Initial coordinates used before a real position is resolved.
 * @returns {Object} An object with geolocation state and a method to request the current position.
 * @returns {boolean} returns.isLoading - `true` while the browser is resolving the current position.
 * @returns {Payload | null} returns.position - Current coordinates, or `null` when unavailable.
 * @returns {string | null} returns.error - Error message returned by the Geolocation API, or `null`.
 * @returns {() => void} returns.getPosition - Requests the current browser position.
 */
export function useGeolocation(defaultPosition: Payload | null = null) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<Payload | null>(defaultPosition);
  const [error, setError] = useState<string | null>(null);

  function getPosition(): void {
    if (!navigator.geolocation) return setError("Your browser does not support geolocation");

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
      },
    );
  }

  return { isLoading, position, error, getPosition };
}
