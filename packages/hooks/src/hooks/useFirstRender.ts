import { useRef, useEffect } from "react";

export const useFirstRender = () => {
  const firstRender = useRef(true);

  useEffect(function markAfterFirstRender() {
    firstRender.current = false;
  }, []);

  return firstRender.current;
};
