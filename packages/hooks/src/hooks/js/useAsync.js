import { useState, useCallback } from 'react';

export const useAsync = () => {
  const [state, setState] = useState({
    data: null,
    isLoading: false,
    error: null,
    isSuccess: false
  });

  const execute = useCallback(async (asyncFunction) => {
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
        error: error,
        isSuccess: false
      });
      throw error;
    }
  }, []);

  return { execute, ...state };
};
