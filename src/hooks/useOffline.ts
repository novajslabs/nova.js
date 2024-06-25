import { useEffect, useState } from 'react';

type TUseOffline = () => boolean;

export const useOffline: TUseOffline = () => {
  const [offline, setOffline] = useState<boolean | null>(null);

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
