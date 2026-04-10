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

/**
 * React hook to fetch JSON data and track request state.
 *
 * @template TData - Expected shape of a successful JSON response.
 * @template TError - Expected shape of an error JSON response.
 * @param {string} url - Request URL.
 * @param {RequestInit} [reqOpt] - Optional `fetch` configuration.
 * @returns {UseFetchReturn<TData, TError>} An object with request state and a refetch method.
 * @returns {TData | undefined} returns.data - Parsed successful response data, or `undefined`.
 * @returns {UseFetchError<TError> | undefined} returns.error - Parsed error payload or thrown error, or `undefined`.
 * @returns {boolean} returns.isLoading - `true` while the request is in progress.
 * @returns {boolean} returns.isError - `true` whenever the request is not currently in a successful state.
 * @returns {boolean} returns.isSuccess - `true` after the latest request resolves with an OK response.
 * @returns {() => Promise<void>} returns.refetch - Runs the request again with the same URL and options.
 */
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
