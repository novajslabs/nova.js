import { useEffect, useState, type RefObject } from "react";

/**
 * React hook to observe whether an element is visible inside the viewport or an intersection root.
 *
 * @param {RefObject<null>} ref - Ref attached to the element observed by `IntersectionObserver`.
 * @param {string} [rootMargin="0px"] - Margin applied to the intersection root.
 * @returns {boolean} `true` when the element is intersecting the observer root.
 */
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
