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

  const handleKeyDown = (e: KeyboardEvent) => {
    const { key, ctrlKey, altKey, shiftKey } = e;

    if (
      (!ctrl && !alt && !shift && key === targetKey) ||
      (ctrl && key === targetKey && ctrlKey === ctrl) ||
      (alt && key === targetKey && altKey === alt) ||
      (shift && key === targetKey && shiftKey === shift)
    ) {
      setKeyPressed(true);
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    const { key, ctrlKey, altKey, shiftKey } = e;

    if (
      (!ctrl && !alt && !shift && key === targetKey) ||
      (ctrl && key === targetKey && ctrlKey === ctrl) ||
      (alt && key === targetKey && altKey === alt) ||
      (shift && key === targetKey && shiftKey === shift)
    ) {
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return keyPressed;
};
