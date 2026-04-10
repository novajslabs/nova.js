import { useState } from "react";

/**
 * React hook to read and update the current page favicon.
 *
 * @returns {Object} An object with the current favicon URL and a method to change it.
 * @returns {string | undefined} returns.faviconUrl - Current favicon URL, if one exists.
 * @returns {(newFavicon: string) => void} returns.changeFavicon - Replaces the page favicon with the provided URL.
 */
export const useFavicon = () => {
  const [faviconUrl, setFaviconUrl] = useState(
    (document.querySelector(`link[rel~="icon"]`) as HTMLLinkElement)?.href,
  );

  const changeFavicon = (newFavicon: string) => {
    let link = document.querySelector(`link[rel~="icon"]`) as HTMLLinkElement;

    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    link.href = newFavicon;
    setFaviconUrl(newFavicon);
  };

  return { faviconUrl, changeFavicon };
};
