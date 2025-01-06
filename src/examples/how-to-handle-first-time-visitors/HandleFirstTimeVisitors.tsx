import { useFirstVisit } from '../../hooks/ts/useFirstVisit';

export const HandleFirstTimeVisitors = () => {
  const isFirstVisit = useFirstVisit();

  const handleClick = () => {
    if (isFirstVisit) {
      alert('Starting the tour...');
    } else {
      alert('Redirecting to the dashboard...');
    }
  };

  return (
    <>
      <h1>{isFirstVisit ? 'Welcome to our app!' : 'Welcome back!'}</h1>
      <button onClick={handleClick}>
        {isFirstVisit ? 'Take a tour' : 'Go to the dashboard'}
      </button>
    </>
  );
};
