import { useEffect, useRef } from "react";

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
