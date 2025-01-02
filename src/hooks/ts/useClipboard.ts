import { useState } from 'react';

export const useClipboard = () => {
  const [copiedText, setCopiedText] = useState<string | null>('');

  const copyToClipboard = async (value: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        setCopiedText(value);
      } else {
        throw new Error('Clipboard not supported');
      }
    } catch (e) {
      setCopiedText(null);
      throw new Error(e instanceof Error ? e.message : 'Unknown error');
    }
  };

  return { copiedText, copyToClipboard };
};
