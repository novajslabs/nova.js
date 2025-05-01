import { useEffect, useRef } from "react";

export default function useEventListener(eventName, callback, element = window) {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (!(element && element.addEventListener)) {
            return;
        }

        const handler = (e) => callbackRef.current(e);

        element.addEventListener(eventName, handler);

        return () => {
            element.removeEventListener(eventName, handler);
        };
    }, [eventName, element]);
}