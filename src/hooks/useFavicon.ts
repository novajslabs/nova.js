import { useEffect, useState } from 'react';

export const useFavicon = (): ((newFavicon: string) => void) => {
  const [faviconUrl, setFaviconUrl] = useState<string>('');

  useEffect(() => {
    let link = document.querySelector(`link[rel~="icon"]`) as HTMLLinkElement;

    if (!link) {
      link = document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'icon';
      document.head.appendChild(link);
    }

    link.href = faviconUrl;
  }, [faviconUrl]);

  const changeFavicon = (newFavicon: string) => setFaviconUrl(newFavicon);

  return changeFavicon;
};
