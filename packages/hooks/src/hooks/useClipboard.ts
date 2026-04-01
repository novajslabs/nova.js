import { useState } from "react";

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
