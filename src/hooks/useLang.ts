import { useSyncExternalStore } from 'react';

const langSubscribe = (cb: () => void) => {
  window.addEventListener('languagechange', cb);
  return () => window.removeEventListener('languagechange', cb);
};

const getLang = () => navigator.language;

export const useLang = (): string =>
  useSyncExternalStore(langSubscribe, getLang);
