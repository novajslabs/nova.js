import { useState } from 'react';

export const useFavicon = () => {
  const [faviconUrl, setFaviconUrl] = useState(
    document.querySelector(`link[rel~="icon"]`)?.href
  );

  const changeFavicon = (newFavicon) => {
    let link = document.querySelector(`link[rel~="icon"]`);

    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }

    link.href = newFavicon;
    setFaviconUrl(newFavicon);
  };

  return { faviconUrl, changeFavicon };
};
