import { useEffect, useRef } from "react";

/**
 * React hook to attach an event listener to a DOM target and clean it up automatically.
 *
 * @param {string} eventName - Name of the event to subscribe to.
 * @param {EventListener} callback - Listener invoked whenever the event fires.
 * @param {HTMLElement | Window | Document | null} [element=null] - Event target. Defaults to `window` when available.
 */
export const useEventListener = (
  eventName: string,
  callback: EventListener,
  element: HTMLElement | (Window & typeof globalThis) | Document | null = null,
) => {
  const callbackRef = useRef<EventListener>(callback);
  callbackRef.current = callback;

  useEffect(
    function subscribeToEvent() {
      const target = element ?? (typeof window !== "undefined" ? window : null);

      if (!(target && target.addEventListener)) {
        return;
      }

      const handleEvent = (event: Event) => {
        callbackRef.current(event);
      };

      target.addEventListener(eventName, handleEvent);

      return () => {
        target.removeEventListener(eventName, handleEvent);
      };
    },
    [eventName, element],
  );
};
