import { useEffect, useState, type RefObject } from "react";

export const useOnScreen = (ref: RefObject<null>, rootMargin = "0px"): boolean => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(
    function syncIntersectionObserver() {
      const handleIntersection = ([entry]: IntersectionObserverEntry[]) => {
        setIntersecting(entry.isIntersecting);
      };

      const observer = new IntersectionObserver(handleIntersection, {
        rootMargin,
      });

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        observer.disconnect();
      };
    },
    [ref, rootMargin],
  );

  return isIntersecting;
};
