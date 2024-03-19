import { useFetch } from "./hooks/ts/useFetch";

function App() {
  const { data, error, isLoading, isError, isSuccess, refetch } = useFetch(
    "https://api.quotable.io/random"
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    console.log(error);
    return <span>Error</span>;
  }

  if (isSuccess) {
    console.log(data);
  }

  return (
    <>
      {data && data.content}
      <button onClick={refetch}>Again</button>
    </>
  );
}

export default App;
