import { useState } from 'react';

export const useClipboard = () => {
  const [copiedText, setCopiedText] = useState('');

  const copyToClipboard = (value) => {
    return new Promise((resolve, reject) => {
      try {
        if (navigator?.clipboard?.writeText) {
          navigator.clipboard
            .writeText(value)
            .then(() => {
              setCopiedText(value);
              resolve(value);
            })
            .catch((e) => {
              setCopiedText(null);
              reject(e);
            });
        } else {
          setCopiedText(null);
          throw new Error('Clipboard not supported');
        }
      } catch (e) {
        reject(e);
      }
    });
  };

  return { copiedText, copyToClipboard };
};
