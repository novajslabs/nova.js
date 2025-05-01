import { useState, useEffect } from 'react';

export const useFetch = (url, reqOpt) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
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
