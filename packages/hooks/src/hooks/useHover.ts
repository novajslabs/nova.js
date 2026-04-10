import { useState, useEffect, type RefObject } from "react";

export const useHover = (ref: RefObject<HTMLDivElement | null>) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(
    function syncHoverState() {
      const node = ref?.current;

      if (!node) {
        return;
      }

      const handleMouseEnter = () => {
        setIsHovered(true);
      };

      const handleMouseLeave = () => {
        setIsHovered(false);
      };

      node.addEventListener("mouseenter", handleMouseEnter);
      node.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        node.removeEventListener("mouseenter", handleMouseEnter);
        node.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    [ref],
  );

  return isHovered;
};
