import { useState, useCallback } from "react";

interface UseAsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  isSuccess: boolean;
}

/**
 * React hook to execute asynchronous work and track its loading, success, and error state.
 *
 * @template T - The resolved type returned by the async function.
 * @returns {Object} An object with the async state and the function used to run a task.
 * @returns {T | null} returns.data - The resolved value from the last successful execution, or `null`.
 * @returns {boolean} returns.isLoading - `true` while the async function is running.
 * @returns {Error | null} returns.error - The error thrown by the last failed execution, or `null`.
 * @returns {boolean} returns.isSuccess - `true` after the last execution resolves successfully.
 * @returns {(asyncFunction: () => Promise<T>) => Promise<T>} returns.execute - Executes the provided async function, updates the state, and rethrows errors.
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
