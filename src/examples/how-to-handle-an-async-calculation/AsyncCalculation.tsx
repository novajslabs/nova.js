import { useAsync } from '../../hooks/ts/useAsync';

const calculateOperationStats = async () => {
  return new Promise<{ total: number; average: number; highest: number }>(
    (resolve) => {
      const operations = Array.from({ length: 100000 }, () =>
        Math.floor(Math.random() * 1000)
      );

      setTimeout(() => {
        const total = operations.reduce((sum, value) => sum + value, 0);
        const average = total / operations.length;
        const highest = Math.max(...operations);
        resolve({ total, average, highest });
      }, 2000); // Simulate an expensive calculation
    }
  );
};

export const AsyncCalculation = () => {
  const { execute, data, isLoading, error, isSuccess } = useAsync<{
    total: number;
    average: number;
    highest: number;
  }>();

  return (
    <div>
      <button
        onClick={() => execute(calculateOperationStats)}
        disabled={isLoading}
      >
        {isLoading ? 'Calculating...' : 'Calculate Stats'}
      </button>
      {isLoading && <p>Calculating statistics for 100,000 operations...</p>}
      {error && <p>Error: {error.message}</p>}
      {isSuccess && data && (
        <div>
          <p>Statistics:</p>
          <ul>
            <li>Total: {data.total}</li>
            <li>Average: {data.average.toFixed(2)}</li>
            <li>Highest Value: {data.highest}</li>
          </ul>
        </div>
      )}
    </div>
  );
};
