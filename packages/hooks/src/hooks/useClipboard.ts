import { useState } from "react";

/**
 * React hook to copy text to the clipboard and keep the last copied value in state.
 *
 * @returns {Object} An object with clipboard state and the copy function.
 * @returns {string | null} returns.copiedText - The last successfully copied string, `null` after a failed copy, or `""` initially.
 * @returns {(value: string) => Promise<void>} returns.copyToClipboard - Copies the provided string to the clipboard and updates the state.
 */
export const useClipboard = () => {
  const [copiedText, setCopiedText] = useState<string | null>("");

  const copyToClipboard = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedText(value);
    } catch (e) {
      setCopiedText(null);
      throw new Error(e instanceof Error ? e.message : "Unknown error");
    }
  };

  return { copiedText, copyToClipboard };
};
