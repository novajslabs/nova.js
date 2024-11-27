import { useState, useCallback } from 'react';

interface UseAsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  isSuccess: boolean;
}

export const useAsync = <T>() => {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    isLoading: false,
    error: null,
    isSuccess: false
  });

  const execute = useCallback(async (asyncFunction: () => Promise<T>) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = await asyncFunction();
      setState({
        data: result,
        isLoading: false,
        error: null,
        isSuccess: true
      });
      return result;
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error: error as Error,
        isSuccess: false
      });
      throw error;
    }
  }, []);

  return { execute, ...state };
};
