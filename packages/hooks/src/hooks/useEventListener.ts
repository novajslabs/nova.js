import { useEffect, useRef } from "react";

export const useEventListener = (
  eventName: string,
  callback: EventListener,
  element: HTMLElement | (Window & typeof globalThis) | Document | null = window,
) => {
  const callbackRef = useRef<EventListener>(callback);
  callbackRef.current = callback;

  useEffect(
    function subscribeToEvent() {
      if (!(element && element.addEventListener)) {
        return;
      }

      const handleEvent = (event: Event) => {
        callbackRef.current(event);
      };

      element.addEventListener(eventName, handleEvent);

      return () => {
        element.removeEventListener(eventName, handleEvent);
      };
    },
    [eventName, element],
  );
};
