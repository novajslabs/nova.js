import { useEffect, useState } from 'react';

export const useOffline = () => {
  const [offline, setOffline] = useState(null);

  useEffect(() => {
    const handleNetworkState = () => {
      setOffline(!offline);
    };
    addEventListener('offline', handleNetworkState);
    addEventListener('online', handleNetworkState);

    return () => {
      removeEventListener('online', handleNetworkState);
      removeEventListener('offline', handleNetworkState);
    };
  }, [offline]);

  return !!offline;
};
