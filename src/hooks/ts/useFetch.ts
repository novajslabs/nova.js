import { useState, useEffect } from 'react';

// Define the interface for the data returned by the API.
interface Data {}

// Define the interface for the error returned by the API.
interface Error {}

export const useFetch = (url: string, reqOpt?: RequestInit) => {
  const [data, setData] = useState<Data>();
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(url, reqOpt && reqOpt);
      const data = await res.json();

      if (res.status === 200) {
        setIsSuccess(true);
        setData(data);
        setError(undefined);
      } else {
        setIsSuccess(false);
        setError(data);
        setData(undefined);
      }
    } catch (e) {
      setIsSuccess(false);
      setData(undefined);
      if (e instanceof Error) {
        setError(e);
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, error, isLoading, isError: !isSuccess, isSuccess, refetch };
};
