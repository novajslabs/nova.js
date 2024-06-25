import { useEffect, useState } from 'react';

export const useFavicon = () => {
  const [faviconUrl, setFaviconUrl] = useState('');

  useEffect(() => {
    let link = document.querySelector(`link[rel~="icon"]`);

    if (!link) {
      link = document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'icon';
      document.head.appendChild(link);
    }

    link.href = faviconUrl;
  }, [faviconUrl]);

  const changeFavicon = (newFavicon) => setFaviconUrl(newFavicon);

  return changeFavicon;
};
