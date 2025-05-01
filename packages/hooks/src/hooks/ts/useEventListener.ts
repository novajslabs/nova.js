import { useEffect, useRef } from 'react';

export default function useEventListener(
  eventName: string,
  callback: EventListener,
  element: HTMLElement | (Window & typeof globalThis) | Document | null = window
) {
  const callbackRef = useRef<EventListener>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!(element && element.addEventListener)) {
      return;
    }

    const eventListener = (event: Event) => callbackRef.current(event);

    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}
