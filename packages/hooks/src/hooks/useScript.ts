import { useEffect, useState } from "react";

/**
 * React hook to load an external script tag and track its loading state.
 *
 * @param {string} url - Script URL to inject into the document.
 * @returns {Object} An object with script loading state.
 * @returns {boolean} returns.loading - `true` while the script is loading.
 * @returns {string | null} returns.error - Error message when the script fails to load, or `null`.
 */
export const useScript = (url: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(
    function syncScript() {
      setLoading(true);
      setError(null);

      const script = document.createElement("script");
      script.src = url;
      script.async = true;

      script.onload = () => {
        setLoading(false);
      };

      script.onerror = () => {
        setError(`Failed to load script ${url}`);
        setLoading(false);
      };

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    },
    [url],
  );

  return { loading, error };
};
