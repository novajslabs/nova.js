import { useState, useEffect, useRef } from "react";

// Define the interface for the data returned by the API.
interface Data {}

// Define the interface for the error returned by the API.
interface Error {}

export const useFetch = (url: string, reqOpt?: RequestInit) => {
  const [data, setData] = useState<Data>();
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const effectRan = useRef(false);

  const fetchData = async () => {
    setIsLoading(true);

    await fetch(url, reqOpt && reqOpt)
      .then(async (res) => {
        if (res.status === 200) {
          setIsSuccess(true);
          setIsError(false);
          setData(await res.json());
          setError(undefined);
        } else {
          setIsSuccess(false);
          setIsError(true);
          setData(undefined);
          setError(await res.json());
        }
      })
      .catch((e) => {
        setIsSuccess(false);
        setIsError(true);
        setData(undefined);
        setError(e);
      });

    setIsLoading(false);
  };

  useEffect(() => {
    !effectRan.current && fetchData();

    return () => {
      effectRan.current = true;
    };
  }, []);

  const refetch = () => fetchData();

  return { data, error, isLoading, isError, isSuccess, refetch };
};
