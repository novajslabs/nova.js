import { useOffline } from '../../hooks/ts/useOffline';

export const ConnectivityStatus = () => {
  const isOffline = useOffline();

  return (
    <>
      {isOffline ? (
        <div>⚠️ You are offline. Some features may not be available.</div>
      ) : (
        <div>✅ You are online. Everything is working as expected.</div>
      )}
    </>
  );
};
