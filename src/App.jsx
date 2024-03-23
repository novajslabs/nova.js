import { useFetch } from "./hooks/js/useFetch";

const AppTs = () => {
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
    <div>
      <p>{data && data.content}</p>
      <button onClick={refetch}>Another quote</button>
    </div>
  );
};

export default AppTs;
