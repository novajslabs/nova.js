import { useSyncExternalStore } from 'react';

const langSubscribe = (cb) => {
  window.addEventListener('languagechange', cb);
  return () => window.removeEventListener('languagechange', cb);
};

const getLang = () => navigator.language;

export const useLang = () => useSyncExternalStore(langSubscribe, getLang);
