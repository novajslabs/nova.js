import { useState, useCallback } from "react";

interface UseAsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  isSuccess: boolean;
}

/**
 * React hook to handle async operations.
 *
 * @template T - The type of the data returned by the async function.
 *
 * @returns {Object} An object with the async state and the execute method.
 * @returns {T | null} returns.data - The resolved value of the last successful execution, or `null`.
 * @returns {boolean} returns.isLoading - `true` while the async function is running.
 * @returns {Error | null} returns.error - The error thrown by the last failed execution, or `null`.
 * @returns {boolean} returns.isSuccess - `true` if the last execution completed successfully.
 * @returns {(asyncFunction: () => Promise<T>) => Promise<T>} returns.execute - Runs the given async function and updates the state accordingly. Re-throws the error if the function fails.
 *
 * @example
 * const { execute, data, isLoading, error, isSuccess } = useAsync<User>();
 *
 * const handleFetch = async () => {
 *   await execute(() => fetchUser(userId));
 * };
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <p>Error: {error.message}</p>;
 * if (isSuccess) return <p>Welcome, {data?.name}</p>;
 */
export const useAsync = <T>() => {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    isLoading: false,
    error: null,
    isSuccess: false,
  });

  const execute = useCallback(async (asyncFunction: () => Promise<T>) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = await asyncFunction();
      setState({
        data: result,
        isLoading: false,
        error: null,
        isSuccess: true,
      });
      return result;
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error: error as Error,
        isSuccess: false,
      });
      throw error;
    }
  }, []);

  return { execute, ...state };
};
