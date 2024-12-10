import { useState, useEffect, useCallback } from 'react';

export const useFetch = (url, reqOpt) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(undefined);

    try {
      const res = await fetch(url, reqOpt);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Request failed');
      }

      setData(data);
      setIsSuccess(true);
    } catch (e) {
      setIsSuccess(false);
      setData(undefined);
      if (e instanceof Error) {
        setError(e);
      } else {
        setError(new Error('An unknown error occurred'));
      }
    } finally {
      setIsLoading(false);
    }
  }, [url, reqOpt]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => fetchData(), [fetchData]);

  return { data, error, isLoading, isError: !isSuccess, isSuccess, refetch };
};
