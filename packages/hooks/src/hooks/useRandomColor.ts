import { useState } from "react";

/**
 * React hook to keep a color value in state and generate a new random hex color on demand.
 *
 * @param {string} [initialColor] - Initial color value. Defaults to `#000000`.
 * @returns {Object} An object with the current color and a generator function.
 * @returns {string} returns.color - Current hex color string.
 * @returns {() => string} returns.generateColor - Generates a new random hex color, stores it, and returns it.
 */
export const useRandomColor = (initialColor?: string) => {
  const [color, setColor] = useState(initialColor ?? "#000000");

  const generateColor = () => {
    const newColor =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");

    setColor(newColor);
    return newColor;
  };

  return { color, generateColor };
};
