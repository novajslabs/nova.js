import { useState, useEffect, useRef } from "react";

export const useFetch = (url, reqOpt) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
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
