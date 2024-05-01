import { useEffect, useState } from "react";

export const useScript = (url: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;

    script.onload = () => {
      setLoading(false);
    };

    script.onerror = () => {
      setError(new Error(`Failed to load script ${url}`));
      setLoading(false);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);

  return { loading, error };
}
