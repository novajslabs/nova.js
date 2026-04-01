import { useState } from "react";

/**
 * React hook to copy text to the clipboard
 *
 * @returns {Object} An object with the clipboard state and copy method.
 * @returns {string | null} returns.copiedText - The last successfully copied string, `null` if the last attempt failed, or `""` as initial value.
 * @returns {(value: string) => Promise<void>} returns.copyToClipboard - Copies the given string to the clipboard. Throws if the Clipboard API is unavailable or the operation fails.
 *
 * @example
 * const { copiedText, copyToClipboard } = useClipboard();
 *
 * return (
 *   <button onClick={() => copyToClipboard("Hello world")}>
 *     {copiedText ? "Copied!" : "Copy"}
 *   </button>
 * );
 */
export const useClipboard = (): object => {
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
