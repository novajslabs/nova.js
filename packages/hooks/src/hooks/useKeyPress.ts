import { useState, useEffect } from "react";

interface KeyConfig {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
}

export const useKeyPress = (config: KeyConfig) => {
  const [keyPressed, setKeyPressed] = useState(false);
  const { key: targetKey, ctrl, alt, shift } = config;

  const matchesKeyEvent = (e: KeyboardEvent) => {
    const { key, ctrlKey, altKey, shiftKey } = e;

    return (
      (!ctrl && !alt && !shift && key === targetKey) ||
      (ctrl && key === targetKey && ctrlKey === ctrl) ||
      (alt && key === targetKey && altKey === alt) ||
      (shift && key === targetKey && shiftKey === shift)
    );
  };

  useEffect(
    function syncKeyPressListener() {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (matchesKeyEvent(e)) {
          setKeyPressed(true);
        }
      };

      const handleKeyUp = (e: KeyboardEvent) => {
        if (matchesKeyEvent(e)) {
          setKeyPressed(false);
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    },
    [alt, ctrl, shift, targetKey],
  );

  return keyPressed;
};
