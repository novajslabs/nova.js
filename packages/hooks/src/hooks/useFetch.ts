import { useCallback, useEffect, useState } from "react";

type UseFetchError<TError> = TError | globalThis.Error;

type UseFetchReturn<TData, TError> = {
  data: TData | undefined;
  error: UseFetchError<TError> | undefined;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  refetch: () => Promise<void>;
};

export const useFetch = <TData = unknown, TError = unknown>(
  url: string,
  reqOpt?: RequestInit,
): UseFetchReturn<TData, TError> => {
  const [data, setData] = useState<TData>();
  const [error, setError] = useState<UseFetchError<TError>>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await fetch(url, reqOpt);
      const payload = (await res.json()) as TData | TError;

      if (res.ok) {
        setIsSuccess(true);
        setData(payload as TData);
        setError(undefined);
      } else {
        setIsSuccess(false);
        setError(payload as TError);
        setData(undefined);
      }
    } catch (e) {
      setIsSuccess(false);
      setData(undefined);
      setError(
        e instanceof globalThis.Error ? e : new globalThis.Error("Unknown fetch error"),
      );
    }

    setIsLoading(false);
  }, [reqOpt, url]);

  useEffect(
    function fetchOnChange() {
      void fetchData();
    },
    [fetchData],
  );

  const refetch = () => fetchData();

  return { data, error, isLoading, isError: !isSuccess, isSuccess, refetch };
};
